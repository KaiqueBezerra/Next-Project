import { useEffect, useState } from "react";

export function ErrorMessage({ error }: { error: string }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (error !== "") {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
      }, 3000); // 3 segundos
      return () => clearTimeout(timer);
    }
  }, [error]);

  if (!visible) return null;
  return <p style={{ color: "#f31", margin: "1rem 0" }}>{error}</p>;
}
