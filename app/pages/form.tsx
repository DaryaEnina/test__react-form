import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import PhoneInput, { isPossiblePhoneNumber } from "react-phone-number-input";
import "./form.sass";

type StateValue = {
  nameValue: string | undefined;
  emailValue: string | undefined;
  phoneValue: string | undefined;
  dateValue: string | undefined;
  textValue: string | undefined;
};

const Form = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: {
      errors,
      isValid,
      isSubmitted,
      touchedFields,
      isSubmitSuccessful,
    },
    trigger,
  } = useForm<StateValue>({
    mode: "onSubmit",
    defaultValues: {
      nameValue: "",
      emailValue: "",
      phoneValue: "",
      dateValue: "",
      textValue: "",
    },
  });

  const [cards, setCards] = useState<StateValue[]>([]);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [cardLenght, setCardLenght] = useState<number>(0);
  const [value, setValue] = useState<string>("");

  useEffect(() => {
    reset();
  }, [reset, isSubmitSuccessful]);

  useEffect(() => {
    if (!isSubmitted || Object.entries(errors).length) {
      setIsDisabled(true);
    } else if (isValid) {
      setIsDisabled(false);
    }
  }, [isSubmitted, isValid, errors]);

  useEffect(() => {
    if (Object.values(touchedFields).some((v) => v === true) && !isSubmitted) {
      setIsDisabled(false);
    }
  }, [
    touchedFields.nameValue,
    touchedFields.emailValue,
    touchedFields.phoneValue,
    touchedFields.dateValue,
    touchedFields.textValue,
    touchedFields,
    isSubmitted,
  ]);

  const onSubmit: SubmitHandler<StateValue> = (formData) => {
    const newCard: StateValue[] = [
      {
        nameValue: formData.nameValue,
        emailValue: formData.emailValue,
        phoneValue: formData.phoneValue,
        dateValue: formData.phoneValue,
        textValue: formData.textValue,
      },
    ];

    setCards([...cards, ...newCard]);

    setCardLenght(cardLenght + 1);
    postSubmit(formData);
  };
  const [error, setError] = useState(null);

  const postSubmit = async (formData: StateValue) => {
    event.preventDefault();
    const requestData = {
      name: formData.nameValue,
      email: formData.emailValue,
      phone: formData.phoneValue,
    };
    const requestJson = JSON.stringify(requestData);

    const response = await fetch("https://jsonplaceholder.typicode.com/users", {
      method: "POST",
      body: requestJson,
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((error) => {
        setError(error);
      });
  };

  return (
    <main>
      <div className="main_wrapper">
        <h2>Form</h2>
        <form className="form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <input
            className="form_name"
            placeholder="Name"
            type="text"
            {...register("nameValue", {
              pattern: /^([a-zA-Z]{3,30}\s[a-zA-Z]{3,30})/i,
              required: true,
            })}
            onKeyUp={() => {
              trigger("nameValue");
            }}
          />
          {errors.nameValue?.type === "pattern" && (
            <span style={{ color: "red" }}>
              Поле должно состоять из Имени и Фамилии латинского алфавита, не
              содержать цифр и иметь только один пробел
            </span>
          )}
          {errors.nameValue?.type === "required" && (
            <span style={{ color: "red" }}>Поле должно быть заполнено</span>
          )}

          <input
            className="form_email"
            placeholder="Email"
            type="email"
            {...register("emailValue", {
              pattern:
                /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/i,
              required: true,
            })}
            onKeyUp={() => {
              trigger("emailValue");
            }}
          />
          {errors.emailValue?.type === "pattern" && (
            <span style={{ color: "red" }}>Неверный ввод</span>
          )}
          {errors.emailValue?.type === "required" && (
            <span style={{ color: "red" }}>Поле должно быть заполнено</span>
          )}

          <PhoneInput
            placeholder="Enter phone number"
            defaultCountry={"RU"}
            // {...register("phoneValue", {
            //   required: "Phone is Required",
            //   pattern: {
            //     value:
            //       /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/,
            //     message: "Invalid phone no",
            //   },
            // })}
            // onKeyUp={() => {
            //   trigger("phoneValue");
            // }}
            onChange={function (value?: string): void {
              setValue(value);
            }}
          />
          {/* {errors.phoneValue && (
            <span style={{ color: "red" }}>{errors.phoneValue.message}</span>
          )} */}

          <input
            className="form_date"
            placeholder="Date"
            type="date"
            data-testid="date"
            {...register("dateValue", { required: true })}
          />
          {errors.dateValue?.type === "required" && (
            <span style={{ color: "red" }}>Дата создания не выбрана</span>
          )}

          <textarea
            className={`form-control ${errors.textValue && "invalid"}`}
            {...register("textValue", {
              required: "Message is Required",
              minLength: {
                value: 10,
                message: "Minimum Required length is 10",
              },
              maxLength: {
                value: 300,
                message: "Maximum allowed length is 50 ",
              },
            })}
            onKeyUp={() => {
              trigger("textValue");
            }}
          ></textarea>
          {errors.textValue && (
            <span style={{ color: "red" }}>{errors.textValue.message}</span>
          )}
          <button className="form_button" type="submit" disabled={isDisabled}>
            <span>Submit</span>
          </button>
        </form>
        {error ? (
          <div className="result error">Ошибка</div>
        ) : (
          <div className="result">Успешно</div>
        )}
      </div>
    </main>
  );
};

export default Form;
