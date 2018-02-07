/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import { PureComponent, type Node } from 'react';

type Props = {
  start: number,
  delay: number,
  renderTime: (time: number) => Node
};

type State = {
  time: number
};

function diffTime(time): number {
  const now = Date.now();

  return Math.max(now - time, 0);
}

class Timer extends PureComponent<Props, State> {
  timer: ?IntervalID;

  static defaultProps = {
    delay: 1000
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      time: diffTime(props.start)
    };
  }

  componentDidMount() {
    this.startTimer();
  }

  componentWillReceiveProps(nextProps: Props) {
    if (this.props.start !== nextProps.start) {
      this.stopTimer();
      this.setState({
        time: diffTime(nextProps.start)
      });
      this.startTimer();
    }
  }

  componentWillUnmount() {
    this.stopTimer();
  }

  startTimer() {
    const onTick = () => {
      this.setState({
        time: diffTime(this.props.start)
      });
    };

    this.timer = setInterval(onTick, this.props.delay);
  }

  stopTimer() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  render() {
    return this.props.renderTime(this.state.time);
  }
}

export default Timer;
