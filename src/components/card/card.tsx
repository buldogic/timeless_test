import React, { useState, useEffect, useRef } from "react";
import { useQuery, useQueryClient } from "react-query";
import { typesUser } from "../../utils/typesUser";
import style from "./card.module.css";
import { dateForm } from "../../utils/dateForm";
import { getUser } from "../../utils/getUser";
import basket from "../../assets/Actions Icons.svg";

interface CardProps {
  filterValue: string;
}

export const Card: React.FC<CardProps> = (props) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(
    null
  );

  const { filterValue } = props;

  const { isLoading, error, data, isSuccess } = useQuery<typesUser>(
    "userData",
    getUser
  );

  console.log(isActive);
  const handleDelete = (
    e: React.MouseEvent<HTMLImageElement>,
    userId: string
  ) => {
    e.stopPropagation();
    const updatedData = data?.results.filter(
      (user) => user.login.uuid !== userId
    );

    if (!updatedData) {
      return;
    }

    queryClient.setQueryData<typesUser | undefined>("userData", (prevData) => {
      if (!prevData) {
        return { results: updatedData };
      }

      return {
        ...prevData,
        results: updatedData,
      } as typesUser;
    });
  };
  const filteredUsers = (value: string): typesUser => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const numberRegex = /^\d+$/;

    if (!data || isLoading) return { results: [] };

    return {
      results: data?.results.filter((user) => {
        const lowerCaseValue = value.toLowerCase();

        if (emailRegex.test(value)) {
          return user.email.toLowerCase() === lowerCaseValue;
        }

        const cleanedValue = value.replace(/\D/g, "");

        if (numberRegex.test(cleanedValue)) {
          const phone = user.phone.replace(/\D/g, "");
          return (
            phone.includes(cleanedValue) ||
            user.dob.age === parseInt(cleanedValue)
          );
        }

        return (
          user.location.city.toLowerCase().includes(lowerCaseValue) ||
          user.location.country.toLowerCase().includes(lowerCaseValue) ||
          user.location.state.toLowerCase().includes(lowerCaseValue) ||
          user.name.first.toLowerCase().includes(lowerCaseValue) ||
          user.name.last.toLowerCase().includes(lowerCaseValue)
        );
      }),
    };
  };

  if (filterValue !== "Search") {
    filteredUsers(filterValue);
  }

  let message: string = "";

  if (error) {
    message =
      error instanceof Error ? error.message : "An unknown error occurred";
  }
  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>An error has occurred: {message}</div>;

  const userData =
    filteredUsers(filterValue).results.length === 0
      ? data?.results
      : filteredUsers(filterValue).results;

  const handleClick = (index: number) => {
    if (selectedCardIndex === index) {
      setSelectedCardIndex(null);
    } else {
      setSelectedCardIndex(index);
    }
  };

  return (
    <div
      className={style.container}
      style={{ overflowY: "scroll", maxHeight: "calc(100vh - 20px)" }}
      onScroll={() => {
        setIsActive(true);

        setTimeout(() => {
          setIsActive(false);
        }, 1000);
      }}
    >
      {isActive ? <div className={style.gradientUp}></div> : ""}
      {isSuccess &&
        userData?.map((user, index) => {
          return (
            <div
              className={`${style.containerCard} ${
                selectedCardIndex === index ? style.active : ""
              }`}
              key={user.login.uuid}
              onClick={() => handleClick(index)}
            >
              <div className={style.cardHeader}>
                <img src={user.picture.large} alt={user.name.first} />
                <div className={style.cardHeaderContact}>
                  <div
                    className={
                      selectedCardIndex === index
                        ? style.cardHeaderNameActive
                        : style.cardHeaderName
                    }
                  >
                    {user.name.first} {user.name.last}
                  </div>
                  <div>{user.email}</div>
                </div>
                {selectedCardIndex === index && (
                  <div className={style.containerDelete}>
                    <img
                      src={basket}
                      className={style.delete}
                      onClick={(e) => handleDelete(e, user.login.uuid)}
                    />
                  </div>
                )}
              </div>
              <div className={style.cardInfo}>
                <div className={style.cardInfoText}>
                  <div>
                    <span>Phone No</span>
                    {user.phone}
                  </div>
                  <div>
                    <span>Birthday</span>
                    {dateForm(user.dob.date)}
                  </div>
                  <div>
                    <span>Address</span>
                    {user.location.city}, {user.location.country},{" "}
                    {user.location.state}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      {isActive ? <div className={style.gradientDown}></div> : ""}
    </div>
  );
};
