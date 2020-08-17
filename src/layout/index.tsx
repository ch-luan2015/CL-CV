import React , {ReactNode} from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

interface Props {
    children:ReactNode,
}

function Layout(props: Props){
    return (
        <div className="bg-grey-lightest font-sans leading-normal tracking-normal">
            <Header/>
                {props.children}
            <Footer/>
        </div>
    )
}

export default Layout;
