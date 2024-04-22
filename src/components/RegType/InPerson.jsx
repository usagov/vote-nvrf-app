import { Icon } from '@trussworks/react-uswds';
import {renderToStaticMarkup} from "react-dom/server";
import {sanitizeDOM} from "../HelperFunctions/JsonHelper";

function InPerson(props) {
    const content = props.content;
    const stateContent = props.stateData;
    const stringContent = props.stringContent
    const contentBody = sanitizeDOM(content.body).replaceAll("@state_name", props.stateData.name);
    const stateLinks = () => (
        <>
            {stateContent.election_website_url &&
                <p>
                    <a href={stateContent.election_website_url} className="usa-button" target="_blank">
                        <span>{stringContent.learnMore}</span>
                        <Icon.Launch title={stringContent.extlink} style={{margin: "-3px -3px -3px 4px"}}/>
                    </a>
                </p>
            }
        </>
    );
    const contentBodyProcessed = contentBody.replace("@state_links", renderToStaticMarkup(stateLinks()));

    return (
        <>
            <h1>{content.title.replace("@state_name", stateContent.name)}</h1>

            <div className={'usa-prose'} dangerouslySetInnerHTML= {{__html: contentBodyProcessed}}/>
            {props.renderContent && <div>{stateContent.name}</div>}
            <div className={'margin-top-5'}>
                <a href={"https://vote.gov"}>{stringContent.backBtn}</a>
            </div>

        </>
    );
}

export default InPerson;
