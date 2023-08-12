"use client";
import "tw-elements/dist/css/tw-elements.min.css";
import { ReactNode, useEffect } from "react";
// import { Ripple, initTE, Modal } from 'tw-elements'

export default function Providers({ children }: { children: ReactNode }) {
  useEffect(() => {
    const init = async () => {
      const { Ripple, Modal, initTE } = await import("tw-elements");
      initTE({ Ripple, Modal });
    };
    init();
  }, []);

  return <>{children}</>;
}
