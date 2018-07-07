import React from 'react';

export default () => {
	return (
		<>
			<div className="info">
				You can add stock symbols to your chat messages by simply adding a "$" followed by a ticker symbol.<br />
				<span className="example">"Buy $AAPL stock, the new iPhone 20 will tank $KRX"</span>
			</div>
			<hr />
			<div className="info">
				You can also use emoji's by adding them in plain text.<br />
				<span className="example">"I :heart: react and I :disappointed: angular"</span><br />
				For a full list of emojis can be found here: <a target="_blank" href="https://www.emojione.com/emoji/v3">https://www.emojione.com/emoji/v3</a>
			</div>
		</>
	);
};
