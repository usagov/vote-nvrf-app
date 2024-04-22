import { Link, Icon } from '@trussworks/react-uswds';
import NextButton from '../NextButton';
import {renderToStaticMarkup} from "react-dom/server";
import {sanitizeDOM} from "../HelperFunctions/JsonHelper";

function Online(props) {
    const content = props.content;
    const navContent = props.navContent;
    const stateContent = props.stateData;
    const stringContent = props.stringContent

    console.log(content)

    if (content && navContent) {
        const contentBody = sanitizeDOM(content.body).replaceAll("@state_name", stateContent.name);
        const contentBodyParts = contentBody.split("@vote_nvrf_link");

        const stateOnlineLink = () => (
                <p>
                    <a href={stateContent.registration_url} className="usa-button" target="_blank">
                        <span>{stringContent.stateOnlineName.replace("@state_name", stateContent.name)}</span>
                        <Icon.Launch title={stringContent.extlink} style={{margin: "-3px -3px -3px 4px"}}/>
                    </a>
                </p>
        );

        const stateMailinLink = () => (
            <p>
                <a href={stateContent.mail_reg_url} className="usa-button" target="_blank" title={stringContent.newWindow}>
                    <span>{stringContent.stateName.replace("@state_name", props.stateData.name)}</span>
                    <Icon.Launch title={stringContent.extlink} style={{margin: "-3px -3px -3px 4px"}}/>
                </a>
            </p>
        );

        const checkRegLink = () => (
            <p>
                    <a href={stateContent.confirm_reg_url} className="usa-button" target="_blank">
                        <span>{stringContent.checkReg}</span>
                        <Icon.Launch title={stringContent.extlink} style={{margin: "-3px -3px -3px 4px"}}/>
                    </a>
            </p>
        );

        const inPersonRegMarkup = () => (
            <div>
                <h1>In-person registration</h1>

                <p>You can also register in person. View {stateContent.name}'s election website for details.</p>
                <a href={stateContent.election_website_url} className="usa-button" target="_blank">
                        <span>Go to {stateContent.name}'s state website</span>
                        <Icon.Launch style={{margin: "-3px -3px -3px 4px"}}/>
                </a>
            </div>
        );

        let contentBodyPartOne = contentBodyParts[0].replace("@state_online_link", renderToStaticMarkup(stateOnlineLink()));
        let contentBodyPartTwo = contentBodyParts[1].replace("@state_confirm_link", renderToStaticMarkup(checkRegLink()))
                                                    .replace("@state_mailin_link", renderToStaticMarkup(stateMailinLink()));
        let inPersonReg = renderToStaticMarkup(inPersonRegMarkup());


    return (
        <>
            <h1>{content.title.replace("@state_name", stateContent.name)}</h1>
            <div className={'usa-prose'} dangerouslySetInnerHTML= {{__html: contentBodyPartOne}}/>
            <p><NextButton stringContent={stringContent} noMarginTop type={'submit'} onClick={props.handleNext} text={navContent.next.start}/></p>
            <div className={'usa-prose'} dangerouslySetInnerHTML= {{__html: inPersonReg}}/>
            <div className={'usa-prose'} dangerouslySetInnerHTML= {{__html: contentBodyPartTwo}}/>

        </>
        );
    }
}

export default Online;
