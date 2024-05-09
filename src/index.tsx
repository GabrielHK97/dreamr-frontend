import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css';
import CreateAccount from './pages/CreateAccount';
import CreateEntry from './pages/CreateEntry';
import ListEntries from './pages/ListEntries';
import Panel from './pages/Panel';
import Root from './Root';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
  },
  {
    path: "/createAccount",
    element: <CreateAccount/>,
  },
  {
    path: "/createEntry",
    element: <CreateEntry/>,
  },
  {
    path: "/listEntries",
    element: <ListEntries/>,
  },
  {
    path: "/panel",
    element: <Panel/>,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <RouterProvider router={router} />
);
