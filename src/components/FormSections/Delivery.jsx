import { Button, Link, Icon, Grid } from '@trussworks/react-uswds';
import React, { useState, useEffect } from "react";
import {fetchData} from '../HelperFunctions/JsonHelper.jsx';
import GenerateFilledPDF from '../GenerateFilledPDF';
import reactStringReplace from 'react-string-replace';

function Delivery(props) {
    const [content, setContent] = useState();
    useEffect(() => {
        fetchData("pages.json", setContent);
    }, []);

    // Add A/B Message randomization.
    const randomProperty = function (obj) {
        const keys = Object.keys(obj);
        const key = keys[keys.length * Math.random() << 0];
        return {
            "key": key,
            "value": obj[key]
        };
    };

    //const stateAddress = props.stateData.state_address;

    if (content) {
        const delivery = content.find(item => item.uuid === "229f283c-6a70-43f6-a80f-15cfa158f062");
        /*const reminderMessage = randomProperty(content.reminder_messages);

        const usagov_resource_link = reactStringReplace(
            content.usagov_rescources,
            '%link%',
            (match, i) => <Link key={i} href={'https://www.usa.gov/how-to-vote'} variant="external" rel="noreferrer" target="_blank">
                {content.usagov_resources_link}
            </Link>
        );*/

        const iconCheckmark = <svg width="49" height="48" viewBox="0 0 49 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.3497 23.0564L16.9974 22.7041L16.6439 23.0552L15.2239 24.4652L14.8678 24.8187L15.2226 25.1736L20.8126 30.7636L21.1662 31.1171L21.5197 30.7636L33.5197 18.7636L33.8733 18.41L33.5197 18.0564L32.1097 16.6464L31.7563 16.2931L31.4028 16.6463L21.1663 26.8731L17.3497 23.0564Z" fill="#5CBF72" stroke="#5CBF72"/>
        <circle cx="24.5762" cy="24" r="22" stroke="#5CBF72" strokeWidth="4"/>
        </svg>


        return (
            <>
                <Grid row>
                    <Grid col={1} className="margin-y-4">{iconCheckmark}</Grid>
                    <Grid col={11}>
                        <h1>{delivery.title.replace("@state_name", props.stateData.name)}</h1>
                    </Grid>
                </Grid>

                <p>{delivery.body.replace("%state_name%", props.stateData.name)}</p>

                <p>
                    <br />{"Office name"}
                    <br />{"Street Address"}
                    <br />{"City and State"}
                </p>


                <Button onClick={() => GenerateFilledPDF(props.fieldData)} type="submit">
                    {"Open form in a new window"} <Icon.ArrowForward aria-label="forward arrow icon"/>
                </Button>

                <span className="divider-grey margin-top-6"></span>

            </>
        );
    }
}

export default Delivery;