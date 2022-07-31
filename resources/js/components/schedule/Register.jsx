// import AdapterDateFns from '@mui/lab/AdapterDateFns';
// import { DatePicker } from "@mui/lab";
import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import axios from "axios";
import { useForm } from 'react-hook-form';
import styled from "styled-components";

export const Register = ({ date, setDate, time, setTime, open, setOpen, getSchedules }) => {
    const { register, handleSubmit, reset, formState: { errors }, setValue } = useForm();

    // stateの値をreact-hook-form内で管理されている値に反映
    setValue('date', date);

    const onSubmit = (data) => {
        console.log(data);
        axios
            .post("/api/schedules", data)
            .then(res => {
                getSchedules();
                // フォームの内容をリセットする
                reset();
            })
            .catch(error => console.log(error));

        setOpen(false);
    };

    const handleClose = () => {
        setOpen(false);
        // フォームの内容をリセットする
        reset();
    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            fullWidth
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <DialogTitle>スケジュールを登録</DialogTitle>
                <DialogContent>
                    <_InputGroup>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                id="scheduleDate"
                                value={date}
                                inputFormat="yyyy/MM/dd"
                                onChange={(value) => {setDate(value)}}
                                renderInput={(props) => (
                                    <TextField
                                        {...props}
                                        label="日付"
                                        margin="dense"
                                        fullWidth
                                        {...register("date", {required: true})}
                                    />
                                )}

                            />
                        </LocalizationProvider>
                        {errors.date?.type === "required" && <Alert severity="error">日付は必ず入力してください。</Alert>}
                    </_InputGroup>
                    <_InputGroup>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <TimePicker
                                id="scheduleTime"
                                value={time}
                                inputFormat="HH:mm"
                                onChange={(value) => {setTime(value)}}
                                renderInput={(props) => (
                                    <TextField
                                        {...props}
                                        label="時間"
                                        margin="dense"
                                        fullWidth
                                        {...register("time")}
                                    />
                                )}
                            />
                        </LocalizationProvider>
                    </_InputGroup>
                    <_InputGroup>
                        <InputLabel id="scheduleCategoryLabel">カテゴリー</InputLabel>
                        <Select
                            labelId="scheduleCategory"
                            id="scheduleCategorySelect"
                            name="category"
                            label="Category"
                            variant="standard"
                            defaultValue="予定"
                            margin="dense"
                            fullWidth
                            {...register("category", {required: true})}
                        >
                            <MenuItem value="予定">予定</MenuItem>
                            <MenuItem value="勉強">勉強</MenuItem>
                            <MenuItem value="仕事">仕事</MenuItem>
                            <MenuItem value="買い物">買い物</MenuItem>
                            <MenuItem value="その他">その他</MenuItem>
                        </Select>
                        {errors.category?.type === "required" && <Alert severity="error">カテゴリーは必ず選択してください。</Alert>}
                    </_InputGroup>
                    <_InputGroup>
                        <TextField
                            id="scheduleTitle"
                            name="title"
                            label="タイトル"
                            margin="dense"
                            fullWidth
                            {...register("title", {required: true})}
                        />
                        {errors.title?.type === "required" && <Alert severity="error">タイトルは必ず入力してください。</Alert>}
                    </_InputGroup>
                    <_InputGroup>
                        <TextField
                            id="scheduleContent"
                            name="content"
                            label="内容"
                            margin="dense"
                            fullWidth
                            multiline
                            rows={4}
                            {...register("content")}
                        />
                    </_InputGroup>
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="outlined"
                        onClick={handleClose}
                    >
                        キャンセル
                    </Button>
                    <Button
                        variant="contained"
                        type="submit"
                    >
                        登録する
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

const _InputGroup = styled.div`
    margin-top: 1rem;
    margin-bottom: 1rem;
`
