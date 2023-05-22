import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { Routes, Route } from 'react-router-dom';
import { router } from './routes/index';

function App() {
    return (
        <>
            <Header />
            <Routes>
                {router.map((route, index) => {
                    return <Route key={index} path={route.path} element={<route.component />}></Route>;
                })}
            </Routes>
            <Footer />
        </>
    );
}

export default App;
