import React, { ReactNode } from "react";
import AdSidebar from "./AdSidebar";
import AdMain from "./AdMain";
import AdHeader from "./AdHeader";
import AdFooter from "./AdFooter";

interface Props {
  children: ReactNode;
}
function AdminPage(props: Props) {
  return (
    <div className="mx-auto bg-grey-400">
      <div className="min-h-screen flex flex-col">
        <AdHeader />
        <div className="flex flex-1">
          <AdSidebar />
          {props.children}
          {/* <AdMain /> */}
        </div>
        <AdFooter />
      </div>
    </div>
  );
}

export default AdminPage;
