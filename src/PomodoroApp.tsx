import * as React from "react"
import moment from "moment";
import { useState } from "react";
import { useEffect } from "react";

import {
  Text,
  VStack,
  Button,
  Icon,
} from "@chakra-ui/react"

import {
  BsFillCaretRightFill,
  BsFillPauseFill
} from 'react-icons/bs'

import CircularTimer from "./CircularTimer"

export default function PomodooApp (pops: any) {
  const MAX_POMODORO_MINUTE = 25;

  const [isRunning, setIsRunning] = useState(false);
  const [timer, setTimer] = useState(moment(MAX_POMODORO_MINUTE, "m"));

  const handleStart = () => setIsRunning(true);
  const handleStop = () => setIsRunning(false);
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
    } else {
      return (
        <Button variant='solid' onClick={handleStart}>
          <Icon as={BsFillCaretRightFill} mr={1}/>
          スタート
        </Button>
      )
    }
  }

  useEffect(() => {
    const id = setInterval(() => {
      // カウントダウンする
      if (isRunning) setTimer((t) => t.clone().add(-1, "s"));
    }, 1000);
    return () => clearInterval(id);
  }, [isRunning]);

  return (
    <VStack spacing={8}>
      <Text fontSize='5xl'>Working</Text>
      <CircularTimer
        value={progress(timer)}
        text={timer.format("mm:ss")}
      />
      <ControlButton isRunning={isRunning}/>
    </VStack>
  )
}
