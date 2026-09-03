// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

/**
 * @file Layout.tsx
 * @input Uses React, stack/stackItem utilities, LayoutAreaContext, LayoutSlotsContext
 * @output Exports Layout component and LayoutProps, LayoutHeight types
 * @position General five-slot layout primitive for arranging header, start, content, end, and footer regions.
 *   Building a page area with a side panel? Use Layout with start/end slots.
 *   Need a header + scrollable content? Use Layout with header + content slots.
 *   AppShell owns the page shell and app-wide navigation behavior.
 *
 * SYNC: When modified, update these files to stay in sync:
 * - /packages/core/src/Layout/Layout.doc.mjs
 * - /apps/storybook/stories/Layout.stories.tsx
 * - /packages/cli/assets/templates/blocks/components/Layout/ (showcase blocks)
 */

import {
  isValidElement,
  type ReactElement,
  type ReactNode,
  useMemo,
  useRef,
  useState,
} from 'react';
import * as stylex from '@stylexjs/stylex';
import {LayoutAreaContext, type LayoutArea} from './LayoutAreaContext';
import {LayoutSlotsContext, type LayoutSlots} from './LayoutSlotsContext';
import {LayoutDividerContext} from './LayoutDividerContext';
import {stack} from '../Stack/stack.stylex';
import {stackItem} from '../Stack/stackItem.stylex';
import {mergeProps} from '../utils';
import type {BaseProps} from '../BaseProps';
import type {SizeValue, SpacingStep} from '../utils/types';
import {themeProps} from '../utils/themeProps';
import {focusOutlineProps} from '../utils/focusOutline.stylex';
import {useTranslator} from '../i18n';
import {focusVars} from '../theme/tokens.stylex';
import {useIsomorphicLayoutEffect} from '../hooks/useIsomorphicLayoutEffect';
import {LayoutContent, type LayoutContentProps} from './LayoutContent';
import {LayoutPanel, type LayoutPanelProps} from './LayoutPanel';
import {
  layoutPaddingOuterXVarStyles,
  layoutPaddingOuterYVarStyles,
} from './padding.stylex';

/**
 * Height behavior for the layout.
 * - `fill`: Layout fills container height, content scrolls internally (default)
 * - `auto`: Layout grows with content, container/page scrolls
 */
export type LayoutHeight = 'fill' | 'auto';

const styles = stylex.create({
  // Outer wrapper uses negative margin to escape container padding
  layoutOuter: {
    marginInlineStart: 'calc(-1 * var(--container-padding-inline-start, 0px))',
    marginInlineEnd: 'calc(-1 * var(--container-padding-inline-end, 0px))',
    marginBlockStart: 'calc(-1 * var(--container-padding-block-start, 0px))',
    marginBlockEnd: 'calc(-1 * var(--container-padding-block-end, 0px))',
  },
  // Inner wrapper resets container padding vars for descendants
  layoutInner: {
    '--container-padding-inline-start': '0px',
    '--container-padding-inline-end': '0px',
    '--container-padding-block-start': '0px',
    '--container-padding-block-end': '0px',
  },
  fill: {
    // Add 2x container block padding to compensate for negative block margins
    height:
      'calc(100% + var(--container-padding-block-start, 0px) + var(--container-padding-block-end, 0px))',
    maxHeight: 'var(--container-max-height, none)',
  },
  auto: {
    minHeight: '100%',
  },
  middle: {
    flex: 1,
    minHeight: 0,
    width: '100%',
  },
  middleConstrained: {
    boxSizing: 'border-box',
    maxWidth: 'var(--layout-content-width, none)',
    marginInline: 'auto',
  },
  middleScrollable: {
    overflow: 'auto',
  },
  middleScrollableExpanded: {
    scrollbarGutter: 'stable both-edges',
  },
  middleExpandedRow: {
    boxSizing: 'border-box',
    width: '100%',
    maxWidth: 'var(--layout-content-width, none)',
    minHeight: '100%',
    marginInline: 'auto',
  },
  middleRowPassthrough: {
    display: 'contents',
  },
  middleFocusInset: {
    outlineOffset: {
      default: null,
      ':focus-visible': `calc(-1 * ${focusVars['--focus-outline-width']})`,
    },
  },
  contentLanePinned: {
    alignSelf: 'flex-start',
    height: '100%',
    position: 'sticky',
    top: 0,
  },
  contentLanePinnedExpanded: {
    height: 'var(--layout-middle-client-height, 100%)',
    maxHeight: 'var(--layout-middle-client-height, 100%)',
  },
  sideLanePinned: {
    alignSelf: 'flex-start',
    display: 'flex',
    flexShrink: 0,
    height: '100%',
    position: 'sticky',
    top: 0,
  },
  sideLanePinnedExpanded: {
    height: 'var(--layout-middle-client-height, 100%)',
    maxHeight: 'var(--layout-middle-client-height, 100%)',
  },
  // When full bleed, set outer padding variables to 0 so child components touch container edges
  fullBleed: {
    '--layout-padding-outer-x': '0px',
    '--layout-padding-outer-y': '0px',
  },
});

const dynamicStyles = stylex.create({
  contentWidthVar: (width: SizeValue) => ({
    '--layout-content-width': typeof width === 'number' ? `${width}px` : width,
  }),
});

/**
 * Full-width scroll alignment requires subtracting contentWidth in CSS.
 * Intrinsic sizing keywords cannot participate in that arithmetic, so they
 * preserve the existing constrained-row behavior.
 */
function supportsFullWidthScrollport(width: SizeValue | undefined): boolean {
  if (width == null || typeof width === 'number') {
    return true;
  }

  const value = width.trim().toLowerCase();
  return (
    value === '0' ||
    /^-?(?:\d+(?:\.\d+)?|\.\d+)(?:[a-z]+|%)$/.test(value) ||
    /^(?:calc|min|max|clamp)\(/.test(value)
  );
}

function isDirectRegion<Props>(
  node: ReactNode,
  component: (props: Props) => ReactNode,
): node is ReactElement<Props> {
  return isValidElement<Props>(node) && node.type === component;
}

function regionUsesMiddleScroll<Props extends {isScrollable?: boolean}>(
  node: ReactNode,
  component: (props: Props) => ReactNode,
): boolean {
  return isDirectRegion(node, component) && node.props.isScrollable === false;
}

function getRegionLabel<Props extends {label?: string}>(
  node: ReactNode,
  component: (props: Props) => ReactNode,
): string | undefined {
  return isValidElement<Props>(node) && node.type === component
    ? node.props.label
    : undefined;
}

interface DetectedRegion {
  usesMiddleScroll: boolean;
  label?: string;
}

interface DetectedRegions {
  start: DetectedRegion;
  content: DetectedRegion;
  end: DetectedRegion;
}

function sameDetectedRegion(a: DetectedRegion, b: DetectedRegion): boolean {
  return a.usesMiddleScroll === b.usesMiddleScroll && a.label === b.label;
}

function sameDetectedRegions(a: DetectedRegions, b: DetectedRegions): boolean {
  return (
    sameDetectedRegion(a.start, b.start) &&
    sameDetectedRegion(a.content, b.content) &&
    sameDetectedRegion(a.end, b.end)
  );
}

function detectDomRegion(
  element: Element | null,
  expectedRegion: 'content' | 'panel' | 'header' | 'footer',
): DetectedRegion {
  const isDirectRegion =
    element?.getAttribute('data-layout-region') === expectedRegion;
  return {
    usesMiddleScroll:
      isDirectRegion &&
      element?.getAttribute('data-layout-scroll-owner') === 'middle',
    label: isDirectRegion
      ? (element?.getAttribute('aria-label') ?? undefined)
      : undefined,
  };
}

export interface LayoutProps extends Omit<BaseProps, 'content'> {
  /**
   * Ref forwarded to the root DOM element.
   */
  ref?: React.Ref<HTMLDivElement>;

  /**
   * Main content area (center).
   */
  content?: ReactNode;

  /**
   * Maximum width of the aligned content within each slot (header, content,
   * footer, panels). Dividers remain full-bleed. Content is centered with
   * `margin-inline: auto` when narrower than the available space.
   *
   * `contentWidth` always includes the complete start + content + end
   * composition. In a fill-height layout, slots whose top-level rendered region
   * is a LayoutContent or LayoutPanel with `isScrollable={false}` move together in the middle scrollport
   * while regions with the default `isScrollable={true}` remain pinned and
   * scroll independently.
   *
   * Numbers are treated as pixels, strings are used as-is (e.g., '60ch').
   * Bare `var(...)` values use the constrained-scrollport fallback because
   * their resolved value may be intrinsic; wrap a guaranteed length in
   * `calc(...)` to use the expanded middle scrollport.
   * Common page widths:
   * - `640` — forms, settings, text-focused pages
   * - `960` — content pages, component demos, wider layouts
   */
  contentWidth?: SizeValue;

  /**
   * End panel slot (right in LTR, left in RTL).
   */
  end?: ReactNode;

  /**
   * Footer slot.
   */
  footer?: ReactNode;

  /**
   * Header slot.
   */
  header?: ReactNode;

  /**
   * Controls the height behavior:
   * - `fill`: Layout fills container height, content scrolls internally (default)
   * - `auto`: Layout grows with content, container/page scrolls
   * @default 'fill'
   */
  height?: LayoutHeight;

  /**
   * Padding at the layout's outer edges using the spacing scale.
   * Controls both `--layout-padding-outer-x` and `--layout-padding-outer-y`.
   * Accepts numeric spacing steps: 0, 0.5, 1, 1.5, 2, 3, 4, 5, 6, 8, 10.
   */
  padding?: SpacingStep;

  /**
   * Start panel slot (left in LTR, right in RTL).
   */
  start?: ReactNode;
  /**
   * Default divider visibility for LayoutHeader and LayoutFooter children.
   * When set, headers/footers that don't explicitly pass `hasDivider` will use this value.
   * When not set, nested layouts inherit from their parent context.
   */
  defaultHasDividers?: boolean;

  /**
   * Children are a shorthand for the `content` slot:
   * `<Layout>{main}</Layout>` is equivalent to `<Layout content={main} />`.
   * The surrounding zones (`header`/`start`/`end`/`footer`) stay explicit
   * props. If both `content` and `children` are provided, `content` wins.
   * Accepting children keeps the natural `<Layout>…</Layout>` form from
   * rendering a blank shell.
   */
  children?: ReactNode;
}

/**
 * Helper component to wrap content in layout area context.
 */
function AreaProvider({
  area,
  children,
}: {
  area: LayoutArea;
  children: ReactNode;
}) {
  if (children == null) {
    return null;
  }
  return <LayoutAreaContext value={area}>{children}</LayoutAreaContext>;
}

/**
 * General layout primitive with header, start, content, end, and footer slots.
 * Use it to arrange regions within a page or bounded container. AppShell owns
 * the page shell, app-wide navigation, responsive shell behavior, skip link,
 * and main landmark.
 *
 * Handles padding collapse between adjacent slots, scroll containment in the
 * content area, and automatic RTL support via CSS logical properties.
 *
 * Structure:
 * ```
 * ┌─────────────────────────────────────────┐
 * │                 header                  │
 * ├──────┬─────────────────────────┬────────┤
 * │      │                         │        │
 * │start │        content          │  end   │
 * │      │                         │        │
 * ├──────┴─────────────────────────┴────────┤
 * │                 footer                  │
 * └─────────────────────────────────────────┘
 * ```
 *
 * When to use Layout vs raw flexbox:
 * - Page with a sidebar → Layout with `start` slot
 * - Dashboard with header + scrollable body → Layout with `header` + `content`
 * - Settings page with nav panel → Layout with `start` + `content`
 * - Simple vertical stack of items → use VStack instead
 *
 * @example
 * ```
 * <Layout
 *   header={<LayoutHeader hasDivider>App Name</LayoutHeader>}
 *   start={
 *     <LayoutPanel hasDivider width={240} role="navigation">
 *       <Navigation />
 *     </LayoutPanel>
 *   }
 *   content={
 *     <LayoutContent role="main">
 *       <MainContent />
 *     </LayoutContent>
 *   }
 * />
 * ```
 */
function LayoutWrapper({
  children,
  content,
  contentWidth,
  defaultHasDividers,
  end,
  footer,
  header,
  height = 'fill',
  padding,
  ref,
  start,
  xstyle,
  className,
  style,
}: LayoutProps) {
  const t = useTranslator();
  const isFill = height === 'fill';
  // Children are a shorthand for the content slot; an explicit `content` prop
  // wins when both are provided.
  const resolvedContent = content ?? children;

  const dividerCtxValue = useMemo(
    () => (defaultHasDividers != null ? {defaultHasDividers} : null),
    [defaultHasDividers],
  );

  // Memoize slots info to avoid unnecessary re-renders
  const hasHeader = header != null;
  const hasFooter = footer != null;
  const hasStart = start != null;
  const hasEnd = end != null;
  const initialStartUsesMiddleScroll = regionUsesMiddleScroll<LayoutPanelProps>(
    start,
    LayoutPanel,
  );
  const initialContentUsesMiddleScroll =
    regionUsesMiddleScroll<LayoutContentProps>(resolvedContent, LayoutContent);
  const initialEndUsesMiddleScroll = regionUsesMiddleScroll<LayoutPanelProps>(
    end,
    LayoutPanel,
  );
  // The wrapper is intentionally the environment-observing boundary around the
  // presentational Layout tree; DOM identity survives RSC serialization.
  // eslint-disable-next-line @astryx/presentational-component
  const middleRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @astryx/presentational-component
  const layoutInnerRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @astryx/presentational-component
  const ownedRegionElementsRef = useRef<Set<Element>>(new Set());
  // eslint-disable-next-line @astryx/presentational-component
  const [detectedRegions, setDetectedRegions] = useState<DetectedRegions>(
    () => ({
      start: {
        usesMiddleScroll: initialStartUsesMiddleScroll,
        label: initialStartUsesMiddleScroll
          ? getRegionLabel<LayoutPanelProps>(start, LayoutPanel)
          : undefined,
      },
      content: {
        usesMiddleScroll: initialContentUsesMiddleScroll,
        label: initialContentUsesMiddleScroll
          ? getRegionLabel<LayoutContentProps>(resolvedContent, LayoutContent)
          : undefined,
      },
      end: {
        usesMiddleScroll: initialEndUsesMiddleScroll,
        label: initialEndUsesMiddleScroll
          ? getRegionLabel<LayoutPanelProps>(end, LayoutPanel)
          : undefined,
      },
    }),
  );

  useIsomorphicLayoutEffect(() => {
    if (!isFill) {
      for (const element of ownedRegionElementsRef.current) {
        element.removeAttribute('data-layout-scroll-state');
      }
      ownedRegionElementsRef.current.clear();
      return;
    }
    const middle = middleRef.current;
    const layoutInner = layoutInnerRef.current;
    if (middle == null || layoutInner == null) {
      return;
    }
    const detectRegions = () => {
      const row =
        middle.querySelector(':scope > [data-layout-middle-row]') ?? middle;
      const startLane = row.querySelector(':scope > [data-layout-start-lane]');
      const contentLane = row.querySelector(
        ':scope > [data-layout-content-lane]',
      );
      const endLane = row.querySelector(':scope > [data-layout-end-lane]');
      const headerLane = layoutInner.querySelector(
        ':scope > [data-layout-header-lane]',
      );
      const footerLane = layoutInner.querySelector(
        ':scope > [data-layout-footer-lane]',
      );
      if (contentLane == null) {
        return;
      }
      const findRegion = (container: Element | null, region: string) =>
        Array.from(container?.children ?? []).find(
          element => element.getAttribute('data-layout-region') === region,
        ) ?? null;
      const headerRegion = findRegion(headerLane, 'header');
      const startRegion = findRegion(startLane, 'panel');
      const contentRegion = findRegion(contentLane, 'content');
      const endRegion = findRegion(endLane, 'panel');
      const footerRegion = findRegion(footerLane, 'footer');
      const next: DetectedRegions = {
        start: detectDomRegion(startRegion, 'panel'),
        content: detectDomRegion(contentRegion, 'content'),
        end: detectDomRegion(endRegion, 'panel'),
      };
      const nextHasMiddleScroll =
        isFill &&
        (next.start.usesMiddleScroll ||
          next.content.usesMiddleScroll ||
          next.end.usesMiddleScroll);
      const nextHasExpandedMiddleScroll =
        nextHasMiddleScroll && supportsFullWidthScrollport(contentWidth);

      for (const element of ownedRegionElementsRef.current) {
        element.removeAttribute('data-layout-scroll-state');
      }
      const nextOwnedRegionElements = new Set<Element>();
      const setOwnedRegionState = (element: Element | null, state: string) => {
        if (element != null) {
          element.setAttribute('data-layout-scroll-state', state);
          nextOwnedRegionElements.add(element);
        }
      };
      if (nextHasMiddleScroll) {
        if (next.start.usesMiddleScroll) {
          setOwnedRegionState(startRegion, 'middle');
        }
        if (next.content.usesMiddleScroll) {
          setOwnedRegionState(contentRegion, 'middle');
        }
        if (next.end.usesMiddleScroll) {
          setOwnedRegionState(endRegion, 'middle');
        }
      }
      if (nextHasExpandedMiddleScroll) {
        setOwnedRegionState(headerRegion, 'aligned');
        setOwnedRegionState(footerRegion, 'aligned');
      }
      ownedRegionElementsRef.current = nextOwnedRegionElements;
      // DOM identity is the cross-RSC source of truth; synchronize before paint
      // and whenever a transparent child changes its rendered root.
      // eslint-disable-next-line @eslint-react/set-state-in-effect
      setDetectedRegions(current =>
        sameDetectedRegions(current, next) ? current : next,
      );

      mutationObserver.disconnect();
      for (const lane of [
        headerLane,
        startLane,
        contentLane,
        endLane,
        footerLane,
      ]) {
        if (lane != null) {
          mutationObserver.observe(lane, {childList: true});
        }
      }
      for (const region of [
        headerRegion,
        startRegion,
        contentRegion,
        endRegion,
        footerRegion,
      ]) {
        if (region != null) {
          mutationObserver.observe(region, {
            attributes: true,
            attributeFilter: [
              'aria-label',
              'data-layout-region',
              'data-layout-scroll-owner',
            ],
          });
        }
      }
    };

    // LayoutWrapper owns narrowly scoped environment observation so RSC-resolved
    // roots and child-local root changes remain synchronized without watching
    // arbitrary descendant mutations.
    // eslint-disable-next-line @astryx/presentational-component
    const mutationObserver = new MutationObserver(detectRegions);
    detectRegions();
    return () => mutationObserver.disconnect();
  }, [isFill, contentWidth]);

  const startUsesMiddleScroll = detectedRegions.start.usesMiddleScroll;
  const contentUsesMiddleScroll = detectedRegions.content.usesMiddleScroll;
  const endUsesMiddleScroll = detectedRegions.end.usesMiddleScroll;
  const hasMiddleScroll =
    isFill &&
    (startUsesMiddleScroll || contentUsesMiddleScroll || endUsesMiddleScroll);
  const hasExpandedMiddleScroll =
    hasMiddleScroll && supportsFullWidthScrollport(contentWidth);

  useIsomorphicLayoutEffect(() => {
    const middle = middleRef.current;
    const layoutInner = layoutInnerRef.current;
    if (middle == null || layoutInner == null) {
      return;
    }
    const updateScrollGeometry = () => {
      if (!hasExpandedMiddleScroll) {
        layoutInner.style.setProperty('--layout-scroll-gutter-inline', '0px');
        layoutInner.style.removeProperty('--layout-middle-client-height');
        return;
      }
      const gutter = Math.max(0, (middle.offsetWidth - middle.clientWidth) / 2);
      layoutInner.style.setProperty(
        '--layout-scroll-gutter-inline',
        `${gutter}px`,
      );
      layoutInner.style.setProperty(
        '--layout-middle-client-height',
        `${middle.clientHeight}px`,
      );
    };

    updateScrollGeometry();
    if (!hasExpandedMiddleScroll || typeof ResizeObserver === 'undefined') {
      return;
    }
    // eslint-disable-next-line @astryx/presentational-component
    const resizeObserver = new ResizeObserver(updateScrollGeometry);
    resizeObserver.observe(middle);
    return () => resizeObserver.disconnect();
  }, [hasExpandedMiddleScroll]);

  const startIsPinned = hasMiddleScroll && hasStart && !startUsesMiddleScroll;
  const endIsPinned = hasMiddleScroll && hasEnd && !endUsesMiddleScroll;
  const contentIsPinned = hasMiddleScroll && !contentUsesMiddleScroll;
  const middleScrollLabel =
    (startUsesMiddleScroll ? detectedRegions.start.label : undefined) ??
    (contentUsesMiddleScroll ? detectedRegions.content.label : undefined) ??
    (endUsesMiddleScroll ? detectedRegions.end.label : undefined) ??
    t('@astryx.layout.middleScrollRegion');
  const slotsValue = useMemo<LayoutSlots>(
    () => ({
      hasHeader,
      hasFooter,
      hasStart,
      hasEnd,
      hasMiddleScroll,
      hasExpandedMiddleScroll,
    }),
    [
      hasHeader,
      hasFooter,
      hasStart,
      hasEnd,
      hasMiddleScroll,
      hasExpandedMiddleScroll,
    ],
  );

  const middleStyles = [
    ...(hasExpandedMiddleScroll ? [] : stack({direction: 'horizontal'})),
    styles.middle,
    !hasExpandedMiddleScroll && styles.middleConstrained,
    hasMiddleScroll && styles.middleScrollable,
    hasExpandedMiddleScroll && styles.middleScrollableExpanded,
    hasMiddleScroll && styles.middleFocusInset,
  ] as const;
  const middleStyleProps = hasMiddleScroll
    ? focusOutlineProps.focusVisible(...middleStyles)
    : stylex.props(...middleStyles);
  const middleRegions = (
    <>
      <div
        data-layout-start-lane=""
        {...stylex.props(
          startIsPinned ? styles.sideLanePinned : styles.middleRowPassthrough,
          startIsPinned &&
            hasExpandedMiddleScroll &&
            styles.sideLanePinnedExpanded,
        )}>
        <AreaProvider area="start">{start}</AreaProvider>
      </div>
      <div
        data-layout-content-lane=""
        {...stylex.props(
          ...stackItem({size: 'fill'}),
          contentIsPinned && styles.contentLanePinned,
          contentIsPinned &&
            hasExpandedMiddleScroll &&
            styles.contentLanePinnedExpanded,
        )}>
        <AreaProvider area="content">{resolvedContent}</AreaProvider>
      </div>
      <div
        data-layout-end-lane=""
        {...stylex.props(
          endIsPinned ? styles.sideLanePinned : styles.middleRowPassthrough,
          endIsPinned &&
            hasExpandedMiddleScroll &&
            styles.sideLanePinnedExpanded,
        )}>
        <AreaProvider area="end">{end}</AreaProvider>
      </div>
    </>
  );

  const tree = (
    <LayoutSlotsContext value={slotsValue}>
      <div
        ref={ref}
        {...mergeProps(
          themeProps('layout', {height}),
          stylex.props(
            styles.layoutOuter,
            isFill ? styles.fill : styles.auto,
            xstyle,
          ),
          className,
          style,
        )}>
        <div
          ref={layoutInnerRef}
          {...stylex.props(
            stylex.defaultMarker(),
            styles.layoutInner,
            ...stack({direction: 'vertical'}),
            isFill ? styles.fill : styles.auto,
            padding === 0 && styles.fullBleed,
            padding != null && layoutPaddingOuterXVarStyles[padding],
            padding != null && layoutPaddingOuterYVarStyles[padding],
            contentWidth != null && dynamicStyles.contentWidthVar(contentWidth),
          )}>
          <div
            data-layout-header-lane=""
            {...stylex.props(styles.middleRowPassthrough)}>
            <AreaProvider area="header">{header}</AreaProvider>
          </div>
          <div
            ref={middleRef}
            tabIndex={hasMiddleScroll ? 0 : undefined}
            role={hasMiddleScroll ? 'group' : undefined}
            aria-label={hasMiddleScroll ? middleScrollLabel : undefined}
            {...middleStyleProps}>
            <div
              data-layout-middle-row=""
              {...stylex.props(
                ...(hasExpandedMiddleScroll
                  ? stack({direction: 'horizontal'})
                  : []),
                hasExpandedMiddleScroll
                  ? styles.middleExpandedRow
                  : styles.middleRowPassthrough,
              )}>
              {middleRegions}
            </div>
          </div>
          <div
            data-layout-footer-lane=""
            {...stylex.props(styles.middleRowPassthrough)}>
            <AreaProvider area="footer">{footer}</AreaProvider>
          </div>
        </div>
      </div>
    </LayoutSlotsContext>
  );

  if (dividerCtxValue != null) {
    return (
      <LayoutDividerContext value={dividerCtxValue}>
        {tree}
      </LayoutDividerContext>
    );
  }

  return tree;
}

/** Renders the public Layout through the environment-observing ownership wrapper. */
export function Layout(props: LayoutProps) {
  return <LayoutWrapper {...props} />;
}

Layout.displayName = 'Layout';
