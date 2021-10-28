export default {
  functional: true,
  render (createElement, ctx) {
    return createElement(
      'pre',
      {
        style: {
          overflowX: 'scroll'
        }
      },
      [
        createElement(
          'code',
          {
            style: {
              fontSize: '12px',
              fontFamily:
                'SFMono-Regular,Consolas,Liberation Mono,Menlo,monospace'
            }
          },
          [JSON.stringify(ctx.props, null, 2)]
        )
      ]
    )
  }
}
