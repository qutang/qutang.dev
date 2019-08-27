export default ({siteName, title, css}) => (
    <head>
        <meta charSet="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <meta httpEquiv="X-UA-Compatible" content="ie=edge"/>
        <title>{siteName + ' | ' + title}</title>
        <link rel="stylesheet" href={css} />
    </head>
)