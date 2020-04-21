import React, { Component } from "react";
import "./layout.css";
import { Header } from "../header/header";
import { Footer } from "../footer/footer";
import { Menu } from "../menu/menu";
import { Home } from "../home/home";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { Products } from "../products/products";
import { About } from "../about/about";
import { PageNotFound } from "../page-not-found/page-not-found";
import { Details } from "../details/details";
import { Insert } from "../insert/insert";

// Needed Installation: 
// npm i react-router-dom @types/react-router-dom

// BrowserRouter = Routing-תגית המיועדת לעטוף את כל מה שקשור למנגנון ה
// Switch - שכתוב בדפדפן Route-המתאים ל Component-תגית המיועדת להציג רק את ה
// Route - להציג עבורו Component תגית המייצגת נתיב אחד הכולל את הכתובת שלו ואיזה
// NavLink - SPA בכדי שלינק לא יגלוש לשרת והאתר ימשיך להיות <a> תגית המיועדת להחליף תגית
export class Layout extends Component {

    public render() {
        return (
            <div className="layout">
                <BrowserRouter> 
                    <header>
                        <Header />
                    </header>

                    <aside>
                        <Menu />
                    </aside>

                    <main>
                        <Switch>
                            <Route path="/home" component={Home} exact />
                            <Route path="/products" component={Products} exact />
                            <Route path="/products/new" component={Insert} exact />
                            <Route path="/products/:prodID" component={Details} exact />
                            <Route path="/about" component={About} exact />
                            <Redirect from="/" to="/home" exact />
                            <Route component={PageNotFound} />
                        </Switch>
                    </main>

                    <footer>
                        <Footer />
                    </footer>
                </BrowserRouter>
            </div>
        );
    }

}

