import { Card, CardBody, CardHeader, CardFooter, Button, Icon, Link } from '@trussworks/react-uswds';
import styles from "../styles/CardInfo.module.css";

function CardInfo(props) {
    const buttonRole = props.role === "link" ? 
    <Link href={props.stateLink} className="usa-button" target="_blank">
            {props.button}
    </Link>
        :
    <Button type="submit" role={props.role} target={props.target}>
        {props.button} 
    <Icon.ArrowForward aria-label="forward arrow icon"/>
    </Button>

    return (
        <>
        <Card gridLayout={{ tablet: { col: 6 } }}>
        <CardHeader>
            <h3 className="usa-card__heading">
            {props.header}
            </h3>
        </CardHeader>
        <CardBody>
            <p>
            {props.paragraph}
            </p>
        </CardBody>
        <CardFooter>
            {buttonRole}
        </CardFooter>
        </Card>
        </>
    );
}

export default CardInfo;