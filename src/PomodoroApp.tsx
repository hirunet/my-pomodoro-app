import * as React from "react"
import moment from "moment";
import { useState } from "react";
import { useEffect } from "react";

import {
  Text,
  VStack,
  HStack,
  Button,
  Icon,
} from "@chakra-ui/react"

import {
  BsFillCaretRightFill,
  BsFillPauseFill,
  BsClockFill,
} from 'react-icons/bs'

import {
  GrPowerReset,
} from 'react-icons/gr'

import CircularTimer from "./CircularTimer"

export default function PomodooApp (pops: any) {
  const MAX_POMODORO_MINUTE = 1;

  const [isRunning, setIsRunning] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [timer, setTimer] = useState(moment(MAX_POMODORO_MINUTE, "m"));
  const [count, setCount] = useState(0);

  const handleStart = () => {
    setIsRunning(true);
    setIsStarted(true);
  }
  const handleStop = () => {
    setIsRunning(false);
  }
  const handleReset = () => {
    setIsRunning(false);
    setIsStarted(false);
    setTimer(moment(MAX_POMODORO_MINUTE, "m"));
  };
  const progress = (t: any) => 
    100 - ((t.minute() * 60 + t.second()) / (MAX_POMODORO_MINUTE * 60)) * 100;

  const ControlButton = (props: any) => {
    if (props.isRunning) {
      return (
        <Button variant='solid' onClick={handleStop}>
          <Icon as={BsFillPauseFill} mr={1}/>
          ポーズ
        </Button>
      )
    } else if ((!props.isRunning) && isStarted) {
      return (
        <HStack spacing={4}>
          <Button variant='solid' onClick={handleReset}>
            <Icon as={GrPowerReset} mr={1}/>
            リセット
          </Button>
          <Button variant='solid' onClick={handleStart}>
            <Icon as={BsFillCaretRightFill} mr={1}/>
            スタート
          </Button>
        </HStack>
      )
    } else {
      return (
        <Button variant='solid' onClick={handleStart}>
          <Icon as={BsFillCaretRightFill} mr={1}/>
          スタート
        </Button>
      )
    }
  }

  const CountIcons = (props: any) => {
    var nums: any[] = new Array(props.count);
    for (var i = 0; i < props.count; i++) {
      nums.push(i + 1);
    }

    return (
      <HStack spacing={4}>
        {nums.map((num: Number) => {
          return (
            <Icon as={BsClockFill} mr={1} color="teal.500" key={num.toString()}/>
          );
        })}
      </HStack>
    )
  }

  useEffect(() => {
    const id = setInterval(() => {
      // カウントダウンする
      if (isRunning) setTimer((t) => t.clone().add(-1, "s"));
    }, 1000);
    return () => clearInterval(id);
  }, [isRunning]);

  useEffect(() => {
    if (timer.isSameOrBefore(moment("0", "m"))) {
      setIsRunning(false);
      setIsStarted(false);
      setTimer(moment(MAX_POMODORO_MINUTE, "m"));
      setCount((c) => c + 1);
    }
  }, [timer]);

  return (
    <VStack spacing={8}>
      <Text fontSize='5xl'>Working</Text>
      <CircularTimer
        value={progress(timer)}
        text={timer.format("mm:ss")}
      />
      <ControlButton isRunning={isRunning} isStarted={isStarted}/>
      <CountIcons count={count}></CountIcons>
    </VStack>
  )
}
