import React, { useEffect } from 'react';
import { Navigate, Outlet, Route, Routes, To } from 'react-router-dom';
import PageTitle from '../components/PageTitle';
import MainLayout from '../layout/MainLayout';
import Home from '../pages/LandingPage/Home';
import SearchPage from '../pages/searchPage';
import { useLocation } from 'react-router-dom';
import NotFound from './NotFound';
import SingleCategoryPage from '../pages/CategoryPage';

const Router = () => {
  const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
              <MainLayout>
                <PageTitle title="Mobylife" />
                <Home />
              </MainLayout>
          </>
        }
      />

      <Route
        path="/profile"
        element={
          <MainLayout>
            <PageTitle title="MobyLife | Profile" />
             <Navigate to="/" />
          </MainLayout>
        }
      />

      {/* <Route 
      path="/single-route/:id" 
      element={
        <MainLayout>
          <PageTitle title="MobyLife | Single route" />
          <SingleRoutePage />
        </MainLayout>
      } 
      /> */}

      <Route 
      path="/category/:categoryName" 
      element={
        <MainLayout>
        <SingleCategoryPage/>
        </MainLayout>
          } 
      />
      
      <Route
        path="/search"
        element={
          <MainLayout>
            <PageTitle title="MobyLife | Search" />
            <SearchPage />
          </MainLayout>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Router;