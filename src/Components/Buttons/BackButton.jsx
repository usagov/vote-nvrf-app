import {Button, Icon} from '@trussworks/react-uswds';

function BackButton(props) {

  return (
    <>
      {props.type === 'link' ?
        <>
          <a href="https://vote.gov">
            <Button className={"maxw-mobile-lg width-full tablet:width-auto"}
                    type="button" onClick={props.onClick} outline>
              <Icon.ArrowBack role="none" aria-hidden="true" alt=""
                              style={{margin: "-3px 4px -3px -3px"}}/>
              <span>{props.text}</span>
            </Button>
          </a>
        </>
        :
        <>
          <Button className={"maxw-mobile-lg width-full tablet:width-auto"}
                  type={props.type} onClick={props.onClick} outline
                  data-test="backBtn">
            <Icon.ArrowBack role="none" aria-hidden="true" alt=""
                            style={{margin: "-3px 4px -3px -3px"}}/>
            <span>{props.text}</span>
          </Button>
        </>
      }

      <hr aria-hidden="true" className="margin-top-4"/>
    </>
  );
}

export default BackButton;