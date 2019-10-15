// you can use debug wrapper to display quickly CE data
// @todo should be styled ;-)
export default {
  functional: true,
  render(createElement, ctx) {
    return createElement(
      'div',
      {
        style: {
          position: 'relative'
        },
        class: 't3p-debug'
      },
      [
        createElement(
          'span',
          {
            style: {
              display: 'inline-block',
              position: 'absolute',
              padding: '0 10px',
              marginRight: '5px',
              top: 0,
              left: 0,
              background: 'red'
            }
          },
          ctx.props.uid
        ),
        ctx.children
      ]
    )
  }
}
