import { useEffect } from "react";

function useTitle(title: string) {
  useEffect(() => {
    document.title = `${title} - SpendSync`;
  }, [title]);
}
export default useTitle;
