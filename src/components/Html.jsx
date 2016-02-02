import {PropTypes} from 'react';
import ApplicationStore from '../stores/ApplicationStore';

const HtmlComponent = props => (
  <html>
    <head>
      <meta charSet="utf-8" />
      <title>{props.context.getStore(ApplicationStore).getPageTitle()}</title>
      <meta name="viewport" content="width=device-width, user-scalable=no" />
    </head>
    <body>
      <div id="app" dangerouslySetInnerHTML={{__html: props.markup}}></div>
      <script dangerouslySetInnerHTML={{__html: props.state}}></script>
      <script src="scripts/client.bundle.js" defer></script>
    </body>
  </html>
);

HtmlComponent.propTypes = {
  context: PropTypes.object.isRequired,
  markup: PropTypes.string.isRequired,
  state: PropTypes.string.isRequired
};

export default HtmlComponent;
