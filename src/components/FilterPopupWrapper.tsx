import { CSSProperties } from "react";
import ContentViewerPopup from "./ContentViewerPopup";
const FilterPopupWrapper = ({ children, }: { children: React.ReactNode }) => {
  return (
    <ContentViewerPopup>
      {children}
    </ContentViewerPopup>
  );
};

export default FilterPopupWrapper;
