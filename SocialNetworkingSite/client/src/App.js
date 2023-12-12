import { Fragment, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Navigate, Routes, Route } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';

import { themeSettings } from './theme';
import { publicRoutes, privateRoutes } from './routes';
import routes from './config/routes';

function App() {
    const mode = useSelector((state) => state.mode);
    const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
    const isAuth = Boolean(useSelector((state) => state.token));
    return (
        <Router>
            <div className="app">
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <Routes>
                        {publicRoutes.map((route, index) => {
                            const Page = route.component;
                            return <Route key={index} path={route.path} element={<Page />} />;
                        })}
                        {privateRoutes.map((route, index) => {
                            const Page = route.component;

                            return (
                                <Route
                                    key={index}
                                    path={route.path}
                                    element={isAuth ? <Page /> : <Navigate to="/" />}
                                />
                            );
                        })}
                    </Routes>
                </ThemeProvider>
            </div>
        </Router>
    );
}

export default App;
