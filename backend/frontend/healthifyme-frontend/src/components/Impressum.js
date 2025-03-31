import React from "react";
import { Helmet } from "react-helmet-async";

function Impressum() {
        return (
            <div>
                <Helmet>
                    <title>Impressum - HealthifyMe</title>
                    <meta
                        name="description"
                        content="Legal notice (Impressum) of HealthifyMe, including website ownership details and cookie policy."
                    />
                    <meta
                        name="keywords"
                        content="Impressum, legal notice, HealthifyMe, website owner, cookies policy"
                    />
                </Helmet>
                <h2>Impressum</h2>
                <p className="impressum">Website Owner: Kat Lentge</p>

                <h3>Cookies</h3>
                <p className="impressum">We use essential cookies that are necessary for the functionality of this website. For more information, please read our <a href="/cookie-policy">Cookie Policy</a>.</p>

            </div>
        )
    }

export default Impressum;