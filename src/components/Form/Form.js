import React from 'react'
import { bindActionCreators } from 'redux'

function redirect(path, predicate) {
  return Component =>
    React.createClass({
      contextTypes: {
        router: React.PropTypes.object.isRequired
      },

      redirectTo(path) {
        const { router } = this.context
        router.push(path)
      },

      componentWillMount() {
        if (predicate(this.props)) {
          this.redirectTo(path)
        }
      },

      componentWillReceiveProps(nextProps) {
        if (predicate(nextProps)) {
          this.redirectTo(path)
        }
      },

      render() {
        return <Component {...this.props} />
      }
    })
}

function redirectOnSuccess(path) {
  return redirect(path, ({ success }) => success)
}

function connectForm(Form, submitAction) {
  class ConnectForm extends React.Component {

    /**
     * Sets the initial state.
     *
     * @param props
     */
    constructor(props) {
      super(props)
      this.state = {}
      this._onSubmit = ::this._onSubmit
      this._clear = ::this._clear
    }

    /**
     * Clears the form.
     */
    _clear() {
      this.setState({
        submitting: false,
        success: null,
        error: null
      })
    }

    /**
     * Handles the submit event.
     *
     * @param args
     * @private
     */
    _onSubmit(...args) {
      // Bind the submit action creator
      const { dispatch } = this.context.store
      const submit = bindActionCreators(submitAction, dispatch)

      this.setState({
        submitting: true,
        success: null,
        error: null
      })

      submit(...args, (err, res) => {
        this.setState(
          err ? {
            submitting: false,
            error: err
          } : {
            submitting: false,
            success: true,
            data: res
          }
        )
      })
    }

    /**
     * Renders the form.
     * @returns {XML}
     */
    render() {
      const { props, state } = this
      return (
        <Form
          {...props}
          {...state}
          onSubmit={this._onSubmit}
          clearForm={this._clear}
        />
      )
    }
  }
  ConnectForm.contextTypes = {
    store: React.PropTypes.object.isRequired
  }

  return ConnectForm
}

export {
  connectForm,
  redirect,
  redirectOnSuccess
}

export default connectForm
