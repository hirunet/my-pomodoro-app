import * as React from "react"
import {
  Text,
  CircularProgress,
  CircularProgressLabel,
} from "@chakra-ui/react"

export default function CircularTimer(props: any) {
  return (
    <CircularProgress 
      color="teal.500"
      size='300px' 
      thickness='4px'
      {...props}
    >
      <CircularProgressLabel>
        <Text className="PomodoroTimerText">{props.text}</Text>
      </CircularProgressLabel>
    </CircularProgress>
  )
}
