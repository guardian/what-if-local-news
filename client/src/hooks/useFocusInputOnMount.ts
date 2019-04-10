import { useRef, useEffect } from "react";

const useFocusInputOnMount = () => {
  const ref = useRef(null as HTMLInputElement | null);
  useEffect(() => {
    const { current } = ref;
    if (current) {
      current.focus();
    } else {
      console.warn("useFocusOnMount could not focus ref as it was not set");
    }
  }, []);
  return ref;
};

export { useFocusInputOnMount };
