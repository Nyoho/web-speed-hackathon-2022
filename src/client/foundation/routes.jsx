import React, { lazy, Suspense } from "react";
import { Route, Routes as RouterRoutes } from "react-router-dom";

import { CommonLayout } from "./layouts/CommonLayout";
const Top        = lazy(() => import('./pages/Top'));
const Odds       = lazy(() => import('./pages/races/Odds'))
const RaceCard   = lazy(() => import('./pages/races/RaceCard'))
const RaceResult = lazy(() => import('./pages/races/RaceResult'))

/** @type {React.VFC} */
export const Routes = () => {
  return (
    <RouterRoutes>
      <Route element={<CommonLayout />} path="/">
        <Route index element={<Suspense fallback={<p></p>}><Top /></Suspense>} />
        <Route element={<Suspense fallback={<p></p>}><Top /></Suspense>} path=":date" />
        <Route path="races/:raceId">
          <Route element={<Suspense fallback={<p></p>}><RaceCard /></Suspense>} path="race-card" />
          <Route element={<Suspense fallback={<p></p>}><Odds /></Suspense>} path="odds" />
          <Route element={<Suspense fallback={<p></p>}><RaceResult /></Suspense>} path="result" />
        </Route>
      </Route>
    </RouterRoutes>
  );
};
