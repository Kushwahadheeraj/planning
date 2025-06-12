"use client"
import StyledComponentsRegistry from "@/lib/AntdRegistry";
import { Provider } from "react-redux";
import {store} from "@/redux/store";
const Providers = ({ children }: { children: React.ReactNode }) => {
  
   return (
    
   <Provider store={store}>
    <StyledComponentsRegistry>
          {children}
    </StyledComponentsRegistry>
   </Provider>
)};

export default Providers;
