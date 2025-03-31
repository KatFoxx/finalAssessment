import React from "react";
import { Helmet } from "react-helmet-async";

function About() {
    return (
        <div>
            <Helmet>
                <title>About HealthifyMe - Your Fitness Companion</title>
                <meta
                    name="description"
                    content="Learn more about HealthifyMe, our mission, and how we help you achieve your fitness goals."
                />
                <meta
                    name="keywords"
                    content="HealthifyMe, fitness, health, wellness, exercise, diet"
                />
            </Helmet>
            <h2>About HealthifyMe</h2>
            <p> Here at HealthifyMe we believe in the power of Lorem ipsum dolor sit amet,
                consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore
                magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
                Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,
                consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
                sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,
                no sea takimata sanctus est Lorem ipsum dolor sit amet.
            </p>
        </div>
    )
}

export default About;