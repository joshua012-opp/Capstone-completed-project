import { Component, type ErrorInfo, type ReactNode } from 'react';

type Props = {
  children: ReactNode;
  sectionName: string;
};

type State = {
  hasError: boolean;
};

export default class DashboardSectionBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  private retry = (): void => {
    this.setState({ hasError: false });
  };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error(`Dashboard section "${this.props.sectionName}" failed to render.`, error, errorInfo);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div role="alert" className="flex min-h-32 flex-col items-start justify-center gap-2 rounded-xl border border-[#e9e7dc] bg-white px-5 py-4 text-sm text-[#77756b]">
          <p>This {this.props.sectionName.toLowerCase()} section is temporarily unavailable.</p>
          <button type="button" onClick={this.retry} className="rounded-lg bg-[#56593B] px-3 py-2 text-[11px] font-medium text-white hover:bg-[#474a31]">
            Retry
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
