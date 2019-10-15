export default {
  functional: true,
  render(createElement, ctx) {
    return createElement(
      'code',
      {
        style: {
          display: 'block',
          maxWidth: '100%',
          wordBreak: 'break-word'
        }
      },
      JSON.stringify(ctx.props)
    )
  }
}
