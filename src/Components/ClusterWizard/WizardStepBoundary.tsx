import { Component, type ErrorInfo, type ReactNode } from 'react';

type Props = {
  children: ReactNode;
  stepName: string;
};

type State = { failed: boolean };

export default class WizardStepBoundary extends Component<Props, State> {
  state: State = { failed: false };

  static getDerivedStateFromError(): State {
    return { failed: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error(`Cluster wizard step "${this.props.stepName}" failed.`, error, errorInfo);
  }

  render(): ReactNode {
    if (this.state.failed) {
      return (
        <div role="alert" className="rounded-xl border border-red-200 bg-white p-5 text-sm text-red-700">
          <p>We couldn’t display this step.</p>
          <button type="button" onClick={() => this.setState({ failed: false })} className="mt-3 rounded-lg bg-[#56593B] px-4 py-2 text-xs text-white">
            Try again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
