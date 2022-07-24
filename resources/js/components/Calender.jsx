import { Fragment, useState } from "react";
import styled from "styled-components";
import { BackgroundColor, BorderColor, Color } from "../variables/Color";

export const Calender = () => {
    const [year, setYear] = useState(new Date().getFullYear());
    const [month, setMonth] = useState(new Date().getMonth() + 1);

    const createCalender = (year, month) => {
        // 今月の初日
        const monthFirstDay = new Date(year, month - 1, 1).getDay();

        return [0, 1, 2, 3, 4, 5].map((weekIndex) => {
            return [0, 1, 2, 3, 4, 5, 6].map((dayIndex) => {
                const day = dayIndex + 1 + (weekIndex * 7);
                return day - monthFirstDay;
            });
        });
    }

    // 日付を表示する
    const displayDay = (day) => {
        // 今月の最終日
        const monthLastDay = new Date(year, month, 0).getDate();
        // 先月の最終日
        const lastMonthLastDay = new Date(year, month - 1, 0).getDate();

        if (day > monthLastDay) {
            return day - monthLastDay;
        } else if (day <= 0) {
            return lastMonthLastDay + day;
        }

        return day;
    }

    const calender = createCalender(year, month);

    const onClick = (n) => {
        let newMonth = month + n;

        // 年を変更する
        if (newMonth <= 0) {
            setYear(year - 1);
        } else if (newMonth >= 13) {
            setYear(year + 1);
        }

        // 月を変更する
        newMonth = newMonth % 12;
        setMonth(newMonth > 0 ? newMonth : 12);
    }

    return (
        <Fragment>
            <_Header>
                <_Title>{`${year}年${month}月`}</_Title>
                <_Nav>
                    <_NavButton onClick={() => onClick(-1)}></_NavButton>
                    <_NavButton onClick={() => onClick(+1)}></_NavButton>
                </_Nav>
            </_Header>
            <_Table>
                <_Thead>
                    <_Tr>
                        <_Th>日</_Th>
                        <_Th>月</_Th>
                        <_Th>火</_Th>
                        <_Th>水</_Th>
                        <_Th>木</_Th>
                        <_Th>金</_Th>
                        <_Th>土</_Th>
                    </_Tr>
                </_Thead>
                <_Tbody>
                    {calender.map((week, weekIndex) => (
                        <_Tr key={week.join('')}>
                            {week.map((day, dayIndex) => (
                                <_Td key={`${weekIndex}${dayIndex}`} id={day}>
                                    <div>
                                        <_Day>
                                            {displayDay(day)}
                                        </_Day>
                                        <_Schedule>

                                        </_Schedule>
                                    </div>
                                </_Td>
                            ))}
                        </_Tr>
                    ))}
                </_Tbody>
            </_Table>
        </Fragment>
    );
};

const _Header = styled.div`
    width: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
`
const _Title = styled.h1`
    font-weight: normal;
`
const _Nav = styled.div``
const _NavButton = styled.button`
    position: relative;
    padding: 0 15px;
    border: none;
    background-color: transparent;

    &:hover {
        cursor: pointer;
    }

    &:first-child {
        &::before {
            content: "";
            display: block;
            width: 12px;
            height: 12px;
            border-top: 1px solid ${BorderColor.body};
            border-right: 1px solid ${BorderColor.body};
            transform: rotate(225deg);
        }
    }

    &:last-child {
        &::after {
            content: "";
            display: block;
            width: 12px;
            height: 12px;
            border-top: 1px solid ${BorderColor.body};
            border-right: 1px solid ${BorderColor.body};
            transform: rotate(45deg);
        }
    }
`
const _Table = styled.table`
    background-color: ${BackgroundColor.table};
    width: 100%;
    margin: 0 auto;
    border-collapse: collapse;
`
const _Thead = styled.thead`
    text-align: center;
`
const _Tbody = styled.tbody``
const _Tr = styled.tr`
    background-color: ${BackgroundColor.tr};
`
const _Th = styled.th`
    border: 1px solid silver;

    &:first-child {
        color: ${Color.Sunday};
        background-color: ${BackgroundColor.Sunday};
    }
    &:last-child {
        color: ${Color.Saturday};
        background-color: ${BackgroundColor.Saturday};
    }
`
const _Td = styled.td`
    border: 1px solid silver;
    padding: .3rem .3rem 1rem .3rem;
    width: calc(100 / 7%);

    &:first-child {
        color: ${Color.Sunday};
        background-color: ${BackgroundColor.Sunday};
    }
    &:last-child {
        color: ${Color.Saturday};
        background-color: ${BackgroundColor.Saturday};
    }
`
const _Day = styled.div``
const _Schedule = styled.div`
    height: 5rem;
`
const _ScheduleTitle = styled.div`
    color: #fff;
    background-color: #0075c2;
    font-size: .8rem;
    border-radius: 3px;
    padding-left: .2rem;
    margin-bottom: .2rem;
`
