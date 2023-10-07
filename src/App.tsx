import './App.css'
import {Routes, Route} from 'react-router-dom';
import DefaultLayout from "./components/containers/default/DefaultLayout.tsx";
import CategoryListPage from "./components/admin/category/list/CategoryListPage.tsx";
import ProductListPage from "./components/admin/product/list/ProductListPage.tsx";
import CategoryCreatePage from "./components/admin/category/create/CategoryCreatePage.tsx";
import ProductCreatePage from "./components/admin/product/create/ProductCreatePage.tsx";
import CategoryEditPage from "./components/admin/category/edit/CategoryEditPage.tsx";
import ProductEditPage from "./components/admin/product/edit/ProductEditPage.tsx";

function App() {

  return (
    <>
        <Routes>
            <Route path={"/"} element={<DefaultLayout/>}>
                <Route index element = {<CategoryListPage/>} />
                <Route path={"create"} element = {<CategoryCreatePage/>} />
                <Route path={"edit"} element = {<CategoryEditPage/>} />
              </Route>
              <Route path={"/"} element={<DefaultLayout />}>
                  <Route index element={<ProductListPage />} />
                  <Route path={"create"} element={<ProductCreatePage />} />
                  <Route path={"edit"} element={<ProductEditPage />} />
              </Route>
        </Routes>
    </>
  )
}

export default App
