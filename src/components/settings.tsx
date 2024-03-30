import {useTime} from "../provider/pomodoro.tsx";
import {ActionIcon, Box, Modal, NumberInput, TextInput} from "@mantine/core";
import {useDisclosure} from "@mantine/hooks";
import {Fragment} from "react";
import {IconAdjustments} from "@tabler/icons-react";


export const Settings = () => {
    const [opened, { open, close }] = useDisclosure(false);
    const { workTime, setWorkTime, pauseTime, setPauseTime, channel, setChannel } = useTime();

    return (
        <Fragment>
            <Box pos={"absolute"} bottom={20} right={20}>
                <ActionIcon variant="filled" size="xl" radius="md" aria-label="Settings" onClick={open}>
                    <IconAdjustments style={{ width: '70%', height: '70%' }} stroke={1.5} />
                </ActionIcon>
            </Box>

            <Modal opened={opened} onClose={close}>
                <NumberInput
                    mb={"lg"}
                    size="lg"
                    radius="md"
                    label="Pause timer in seconds"
                    withAsterisk
                    description="the time that passes when the pause is active."
                    placeholder="600"
                    value={pauseTime}
                    onChange={(value: string | number) => {
                        setPauseTime(Number(value));
                        localStorage.setItem("pause", String(value));
                    }}
                />
                <NumberInput
                    mb={"lg"}
                    size="lg"
                    radius="md"
                    label="Work/Study timer in seconds"
                    withAsterisk
                    description="the time that passes when the focus is active."
                    placeholder="3000"
                    value={workTime}
                    onChange={(value: string | number) => {
                        setWorkTime(Number(value));
                        localStorage.setItem("work", String(value));
                    }}
                />
                <TextInput
                    size="lg"
                    radius="md"
                    label="Twitch Channel name"
                    withAsterisk
                    value={channel}
                    onChange={(value) => {
                        setChannel(value.currentTarget.value);
                        localStorage.setItem("channel", value.currentTarget.value);
                    }}
                />
            </Modal>
        </Fragment>
    );
}