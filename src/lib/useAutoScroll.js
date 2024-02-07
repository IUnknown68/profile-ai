import {
  onMounted,
  onBeforeUnmount,
  ref,
} from 'vue';

import {
  scroll,
  debounce,
} from 'quasar';

const {
  getScrollTarget,
} = scroll;

const AT_BOTTOM_THRESHOLD = 80;

//------------------------------------------------------------------------------
function getDomNode(elementRef) {
  const v = elementRef.value || elementRef;
  if (typeof v !== 'object' || !v) {
    return null;
  }
  if (v.$el) {
    return v.$el;
  }
  return v;
}

//------------------------------------------------------------------------------
function createScrollTarget(threshold = AT_BOTTOM_THRESHOLD) {
  const scrollTarget = {
    elementRef: ref(),
    atBottom: ref(true),
    enabled: ref(true),
  };

  function maybeGoToBottom() {
    if (scrollTarget.enabled.value && (scrollTarget.atBottom.value)) {
      scrollTarget.gotoBottom();
    }
  }

  scrollTarget.gotoBottom = (/*duration = AUTOSCROLL_DURATION*/) => {
    scrollTarget.node.scrollTo(0, scrollTarget.getScrollHeight());
    scrollTarget.atBottom.value = true;
  };

  scrollTarget.$updateAtBottom = () => {
    scrollTarget.atBottom.value = scrollTarget.getBottomDistance() < threshold;
  };

  scrollTarget.$updateAtBottomDebounced = debounce(
    scrollTarget.$updateAtBottom,
    10,
  );

  scrollTarget.update = maybeGoToBottom;

  return scrollTarget;
}

//------------------------------------------------------------------------------
function attachScrollTarget(scrollTarget) {
  const targetNode = getScrollTarget(getDomNode(scrollTarget.elementRef));

  Object.assign(scrollTarget, (targetNode === window)
    ? {
      getScrollHeight() {
        return document.body.offsetHeight;
      },
      getBottomDistance() {
        return document.body.offsetHeight - window.innerHeight - window.scrollY;
      },
    }
    : {
      getScrollHeight() {
        return targetNode.scrollHeight;
      },
      getBottomDistance() {
        return targetNode.scrollHeight - targetNode.scrollTop - targetNode.clientHeight;
      },
    });

  scrollTarget.node = targetNode;
  scrollTarget.node.addEventListener('scroll', scrollTarget.$updateAtBottom);
  //window.addEventListener('resize', scrollTarget.update);

  scrollTarget.resizeObserver = new ResizeObserver(scrollTarget.$updateAtBottom);
  scrollTarget.resizeObserver.observe(getDomNode(scrollTarget.elementRef));

  return scrollTarget;
}

//------------------------------------------------------------------------------
function detachScrollTarget(scrollTarget) {
  scrollTarget.node.removeEventListener('scroll', scrollTarget.$updateAtBottom);
  scrollTarget.resizeObserver.disconnect();
}

//------------------------------------------------------------------------------
export function useAutoScroll(threshold = AT_BOTTOM_THRESHOLD) {
  const scrollTarget = createScrollTarget(threshold);

  onBeforeUnmount(() => {
    detachScrollTarget(scrollTarget);
  });

  onMounted(() => {
    attachScrollTarget(scrollTarget, threshold);
  });

  return scrollTarget;
}

export default useAutoScroll;
