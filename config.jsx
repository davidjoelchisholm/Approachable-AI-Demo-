
// config.jsx — Pre-launch configuration screen, config helpers, standalone export

const CONFIG_KEY = 'aai-config-v1';

const CONFIG_DEFAULTS = {
  splashCaption: "WHAT IS APPROACHABLE AI",
  splashHeadlineLine1: "Your best operator,",
  splashHeadlineLine2: "built into a laptop.",
  bootSubtitle: "ON-DEMAND INTELLIGENCE · READY",
  outroTag: "",
  outroLine1: "FROM TRIBAL KNOWLEDGE TO INSTITUTIONAL INTELLIGENCE",
  outroLine2: "",
  logoSrc: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEACAYAAABccqhmAABU4ElEQVR42u19eXxcR5X1uVX1tpbULduJs5IQCAlxAgEcW1ISUALMDOuwjQwMMHwZ9i0hluQlidVqZbOtxQn7DsM3zIDFMDDAB8MssSFEkhdIAg4QIIGQfbGtltTLe6/qfn90t9xabLdsSdbyzi/8gPxsqfu9qlP33rrnXCBChAgRIkSIECFChAgRIkSIECFChAgRIkSIECFChAgRIkSIECFChAgRIkSIECFChAgRIkSIECFChAgRIkSIECFChAgRIkSIECFChAgRIkSIECFChAgRIkSIECFChAgRIkSIECFChAgRIkSIECFChAgRIkSIECFChAgRIkSIECFChAgRIkSIECFChAgRIkSIECFChAgRIkSIECFChAgRIkSIECFChAgRIkSIECFChEUHih7B4gQzCO2g3vuaqKlpkj+wbwW3I4X2FJgAjp5YRAAR5vNmX9MksOJJwoXLmdb06in9/SQE0Ch2ALgCOw2lYKKnGhFAhLm+6XubBABMtuEPbLu4lox3EoCl0IgTk2sAJYTJk6CMgDmYC/DMsqz3NKV25iaSQqMCrjCUSkVkEBFAhDmz8ZMQuLCJyjc9d/5V1RAPvYgUVrOhSwDzfIDOYMZSS5JlSYIgAhFgmKEN4GsDZgwz42kiPCgI9zKwy4S8O7F+4PejPxsgbG8SWNNrolQhIoAIc2TjP51cHfdq6ZUw9EYDNFqCznJsCYChNSPQDG0YmsGFfcyl/UxgEBFICoISBEsSSBDAjKGc9gXhHgZ+TITvVq/t/8XoZ9jeJCMiiAggwgkI9UsbP7257gLp0D+ywZqYLc8iQcgHGvmAGcSaCrtcgIlAKP5z2J/NIDCYi/8NEoKkZwlIJTCSDZkIPxOGv5oeGvr2Kan7hktEMNU6Q4SIACJMZeMDtCPZKK9M7QwBYKi7/gUK1GyI3xpzlJv3NXKhKZzGRESAmKbfywAzAEMgVeVICAKygfkDs/lUWme/dFrrvSOFW4YkRTWCiAAiTPfmLzthh7euOlUouRHABzxHOcO5EIY5JJDANG36I0cgrAHAtaS0LYFsPvytZtxY09z/L6NpQVOvIYrSgogAIhx/no8kKJUye96/0rrg+dYHBdFG15anDWdDaGZNRIIqeK/FpJ8JzFzcmkTFYL/wf0ZrARVGBoaZOWZLaQlC1jf/zdCbqpp39QPAHclGdUVqp47qAxEBRDjOPH+4u+41kkSH68iVOV/D1yYESB4xny/8Y4rZg5AEYUkBJQAh6NBqKAb42jBCUygWMrMmAnOhFCiORgRg5rirZCYwhoAvZk1w87KWPX+J6gMRAUQ4jnB/qGfVhRIqZUl6CxEwnNeaQOJIpzQDBmAjiZRnSwhJ0KFBJq/zDDxBhCfA2M9EIwCHYLIBJIj4JAJOBdHJ1Y4EiOAHBrnAMIg1mOQRf28hGpE1nkIuHz6lDW19aujRT52T+nOuEMkAUUNRRAARDreBmpokegtXag/fsmrZEle2EtHVniW8dE4bBkMU8vzD5+ZEFLOEUEpgOBvmAd4Dph0Gpo9Z/3ZkBI+dkdqbOdzPONhdv5SZzhZsXkRELyXgZbYSzy3k+hq+NkclIMOsbSmk50hk8/peNkhWtfR9N6oPRAQQ4XB5/n1NRL29mgEa6al/jyTc4Drq7OFsCG1YCyJ5lFwcNa4SYEbGN/cQ4Rs6FP+RWH/X7yb584QkCBc2EQD09gJNK3p5stOZk41uLuFfati8HSTeHHPk0qyv4YfmiLUHZjCDTZUtJRHga/6+AbVVX3vX3WVRTjE9iRARwGLc+OOu9Q50rn65q2SHa4nL8qFBPjxynl/aZDFLSiUJWV//DGx6dg15Pyj9zMLVXKPEhcsZ+3oZRxD6MFA4l9uTtAM7xBXjNAQj3fVnEPAeJnwk5qjlQ9lwNOw//HdkAwBxV4msb3wAn9Eat9a09j0Z1QciAojy/ELYfa5FSEpB77SEwHA+1Ee7xzfM2pJCxhyJbD78nWZ0lK7hiie3wjSIeEbbfnFIX/DUlktP9yyzXoA+6NnCTudCU1hYR05PBJGs9hRyvn7EGHPLrrT7hStTO0NOJgWQiuoDEQEshnA/KdCeYiLwU1suralS5loStNa1RSKd0cxgFnSUPB8k4jFJ2bweNKDuvwR02wXr7xoaFQPNUGtuKZqgYnQx3FP/EkHocKR4rWEgE+jwSIXC4q2EtqVQri2Q9c0uo9FW3dL3n1F9ICKAhb3xx13rZbrr/x6Ckp4jz8tkNQJjjprng5mrXSWD0EAzvh6E1FG77q4/znYoPf67jHTWvZkkpTxHXVQqFB7puxgGE9hUOVIaBoKQt+vAtMc3DPwmSgsiAljQef7gtksbLHCHp8Qrfc3IBke+1iudmo4SylECOd/cGWqzqaZ1YAdwYpttyq/2Huqu95YyPiYErfMcuayS+oBhNgBRwpOU9fUIM9/+tG91nb3xzgMMUG9Tk1jTGxFBRAALIM9/puuSZ3lS3QDQe10lxFCusjxfCZJVnkI2p/8Uar4p3tr/FQDM25sk9k1euT+R33P/5svOcm19A4Pe61mCpvo9M7nwQWG4w2sZ+NpoWjBHvmdEABGmfDI+mGx0T47nPyYFrXNteVJFJyPYEAhxV4qsbzLM/Iln0ug8K9W/nwFCU5OgOXYyToh0uhouVZJvjCn58qlFOlI5ipDz9U+DAG3x9f07T3SkExFAhGPLjbvr30SCUp4tX1BJbly61qt2pGQGgtB8OzQmGW/ddd98yY3HP4Oh7rp3ShJtniOfN5LTCCusddS4SuZDA2Z8zc8HN9Zu3PNAVB+ICGDO5vnYfmjRH+i65MWOUB2OEq8zDIz4lZ1+h6rjeo8Jua26deBHo2HwPKuOl9923J9cHT8jTmuJxLWeI+IV33YQibinKJsPDxrirj8dHLr9otR9w5HsOCKAOZnnP35z3SlxT2wA8OFjuR/P+uFjbHDLrrTzuYVyP17+fAa31D1P2SKpCO9Qx9bv8FttuL2mZeBb85UYIwJYUHl+QaZ7R7JRrU74HxDg61xHnT6cDWGm0iEXGB/gzw4FevMp63Y/vtBC3QlGJl0Nr1CCO1xbXpoPDPK6wo5HW0olCLlA/6fPaKtt7t8V1QciAjihOe5wd/2rJKHDddSqSmS65T3yggj5QP8wT2hbUvTZW8iLudzDMAmI1u6690gSN7iOPGs4V5nm4ZDsWGtmfCEH3HxSc/8jUX0gIoBZDWef7ly9IiZlu5LUJIoyXYCEqFAll/P1r4LQtMdbB76z2MJZbmqSpVuMR5IrT6pNqHVE4qMl1SPAR02bSrLjbD58koHNjzz49GfO++Qf8lFbcUQA047tTU2yqSjTPXjr5UssS7eSxNWeJaoqlekeWrD6GWN4637CJ89q7s8uZp382P6B+he4NrVbkt5cie9BqXBqCaEKsuPw7sBwMtEy8B9RfSAigGkPWQvhft1VgsQmz5XnjGRDhBWGrDWukrnQGGb+ct4Pblq6Ye9DUch6mJSqp+G1gtDh2eIlOd8gP1XZcWi+q0NO1qwbuDd6xhEBTE/RqrPuCiGoI+bIl05FputZUtqSkPH1/4ZMmxItfXdFRasjkG0xEvp1coV9TiLxIQI2eo48pXLZcbF5KtA5Znx6MJvbcvr1dz8VEUFEAMcUlh7sueQ5FlttQuDdjhKovK1VyCpPIpvTvwc4FVvb/40oLJ368x/uWXmagH0dgz8Ys6UazIWGUMG1qiheq+b0w8x80w/7+7+0pheam5okVkRtxREBTHoCHWpceSK5oroqnvi4JDS7jqhNZzQDbI4mbCEQxWOKsnmdZjbbsmnuOSm1Kx01rhxfBHaw85JVtrRSriVeHRpGpsLGKkcK5dgC2bzu14bbaloG/muUiBfxNKOIAI6Qgw51171NCUq6tnp+Jq8R6Apluo6SgTHQ2nwjDJEqzdKLQs/pfDcNTZLQ7jlyRSXvxnDBFbnGkTI0QGjMv2aCMHXy+j2/W8zvJiKASU6Zwc66OktRh6vkX4eGka3Q3MKRQjmWQMbXd/mG2pa09P1PlOfPXH3gkeTK2JKEfTURWl1bLk1nQwZXGp1Jyub1MDO25YOge+mGvYPMoN41i0t2vOgJYMx9/ubVZ7qWvF4Qv8+zpBzMhaY4GeOIeb4UJKtdhVw+fEgz39TZPPDlFGAi+ersvLcDt9Y923FoE0D/6FpTqc+QrHIVsvnwj4bRUd3c//XSz27f18upRfDeFi0BlJ8k999+rnNmsOwjJGm9a1dmcDlGphuYLBt8MsyHWxPX7X6GAJiyBpcIsxO5ZbrqLocQN3q2uMIPGbnwKJEbg0GsXSWVrQiZvNmh2WyKtwzcuVgit0VHABOm6fasfoOCSHmOujib1wiMCQkkcZRrvUMyXf6ONkjWtPb9OsrzTwySSYj2MT0a9f8gCG2eo547kptij0ZgmJm/6vt845KNA39a6O90URHAmGul7tUXCxIdthJ/yxXKdJnZOEpI15bI+voXhnVb9dpdPyz97Oha78Rie1OTbNpeeAf7N69MOLbVQsDHPUdWDxZubyqXHft6v2F0Dg76nzgjtTezULs0abFt/MeSDcvjCawn8Ec8WzpT7TfP5fXjIczmHw0OfXZN6j4/GnM1t9/34JZLz7ctkxRCvF0JYKhCncYh2bG+j4Fk1dq+by9Eol/QBFAu093e1CRf3/CX9wF0vevIMyuT6RZujxKFQRYBgM8PZ/xblt+w97Eo3J/79YFyY5ahrrq/kkLc6DmiLu8b5CpsK47ZUkoB5AP+kY+wrXbt7j2jRLAA+gcWJAFM7Clf/dcSssMtvvypaM6lIOQD8yNG2FZVfPnRtd48OwSKo9a2NzXJ1zb85X0CdL3rFg8Bc/S2YgZGDwEDfD6zgA6BBUcA5S/kqa6G51cLTgoh3nZs4V94H4MWbPi3WNOC9M2Xnyy9cD0RPuJZ0j2WNNAwbn0wPfi5i+Z5GrhgCKC8AHQgeXGtm/CauVgAmrLvnK/3g03ngcFwQReAFjsR7O9efbELkbIt8YZjLgSHaKtu7Zu3heB5TwATZLo99e9WhE2OHV0BRagsRRzpqvtbISjlOupFpavgSlLE0lVwaPjfwhDt8/EqeN4SwPgmkP2dDS/zJDpcWzQeUxOIr3dow4uqCSSqDxwqEt9/+7nOacGyj6gpNIONlR2bLBvzyTBvtiau2/0MMNbtKCKAGQrjDnSuPseWYhMRXeUek0x38baBRpi4nka6688gwvUA3u9ZUqYrXE+yKDvO5MKHmPmmquaBL9Ecm9o07wlgvBAkkbA+LoAWz1FL0pmwIpkuQJSIhCARjhJRDnbW1VmCOly7IAjLVFgfcJWQjiWQC8zPQ0Zbzdq+/53LEeW8IIAJUtCe+jWKKOnalUtBqZizhYYRGo6koBEqWmuZrrq3QlC75xyLJJyhtZ7TkvA5TQDjmzkOdjasshU6XCVedUys7Jv+0JjIDCJCBdHmWFOYmtqaa8DU4jmyIlMYZtYAiYLs2KQB7nl40Gw7b46ZwsxZAhhzn7/l0tOrbHMdgA94llSD2dAQTd0OKpbu/yKlYBa7HRQDhYuqdhAubJp8DexbwUAKSIEXM0FOty2cBqdqymzhTnS9ac4RwHhDyLPj8Q8rog3ulAwhi1N2fJ0jwqcOZHJbF6shJAOEJGgHGsUVAICdZqrEVwqLse9JAq4wSKUWFSmMrw+ku+sbLUKHa8uXHYsxbDbQ/xMYaisZw57ISHTOEMCE9t2uhtcJwR2eo16c83VkCX0MqRMATPad77/9XOd0fdpS1uEyJlMrIKqM0S6EJGaTJ4iRUOhBR+GZg/v1/jNSezOTnYwAsJg6IydawzdcJQjz2hp+ThBA+Rcf6q5/gSRK2YrexFOYpntoKIS+OzBmUQ6FGL9AC/+uUQ1X+88nySuN4UuY6UICzmbikwGqdhSRJEKpP9owQxvADw0YGGHmZwToIRB+w4xfGKn3pFnuO6u5P1v+/np7gcVygzJ+OIxj6xYWuMazRNVgtjLZcflwGDBvefphfOqsbbM/HIZO+IJtBxOB010rTyKy1kvCRz176v3Zi3ks1PamJtlUVtN4rPmFVTWnei+DpNexwZVMOL/GkQJEYMMINCM0DG242BAFJjAXCJUIDCICSUFQgqBkgSAAIJPTMMwPCKKfAeb7AeiO2ub+/ZNFcYupPpDeVneBNKLdUrRGEDCS15qPczzcbDxHmgsPb7i77n2SxCbXkc865sGQWdx80g2LazDk+NNiaGvdCyHpXQJ4s2OJ50gpEIQGucAUtQ4obHcqbHIU8ik6PL+iUC5kLpIEAJBylIBtCbBhZH39GIDvE9M/xUo57bjbmwX9DsaR3sHu+lfZhA7PkatyvpnygFg/1P8xlNOty6/bff9srGM6kZv/kc0rz1pi25/zHPHqqTysxT4aesJddXd9I4iuMeDXVzlK+YFBLjQGhVZVAYBoGt81A4bAhhlkF4UxOV+Dwf/LLD5Rtfau7xUIavFEYRNGxMf99xPx9d4URsQzAwlPiVxoDuZ9/kjtuv5/mWkSoBO1+Z/ZuqqhylLbHVucmc6GIUDiaNcpZTLd32rD7TUtA99aTHn+xCEZDascxdcLojfYSmAop8Hgoz7LaSYj5oJBqqhxJTEz/ND8NDR805h+i8VShynbsI/fXHdK3BMbAHzYs4WdzoWmsOlIHC0tcC2B4by+Pt7Sf8tMkgCdiIezf8vql8Yc+UNBVJPxdSiI1JHy/IJMV1Iurw9ow91DnL3ttNZ7R8pZdzEtrJEtl57OlrleEN7vWVKls6ONKeKEpnXMmgGKu0qEhqG1+Vbgcyq+YeA3iyk1A0BclgId6Gp4sSORsiW9vsLCtiGAa2JKHhgO2pauG7jxjmSjKhH/vCQATkJQCubpztUrqpS8UxAtyQb6sLl++ZVJPjQwjK8F+eDG2o17Hlisef6vkyvsc+LxD4sp9EWcOCIgkfAkZX09wky3P+3LrrM33nlgMWkuJjhQd9e/SRGlPEe+IJvX8I/QVswMFgK62pHqYCa8asm6ga/NxJqnWXsQ7Ul6vPrfvSoR66+y5UVDuXDSL8/FBeRZUhZluj/VmjbFW/t+upjz/MGe+tdbQMpz5IuzeQNfH7kvYi5gdPiGp5DJ6QeZTEf1tQNfG00LFsnQlHISfzDZ6J6S8D8K8HrPUScNZUOUUqiJzw9sSbAgyoccrqpZu3tf6SCdXwRQZK6DW1Z3J+L22sHhYNKw3zBYEKjGU8j6+gGjzY3VLYtwwYzri1CCUpakNwHAcP7I4eMcrFsUxqYpqRxFyPn6pwGjLd7cv3MxEfr49/pM1yXPckndQILeawkSGV9PGskZZh13lUxngzsTI7sapzvlpZlnv6RAKsX7N69a4dnql4ZZaMaEk4vBxpZCMGDY8Nan/ZGtZ2/81eIKGcvvlbtWniTJWk9T6IuY40QwJqVjxtfS+eDGUxdbSje+rbir7nIl6LOeLS9KZ8NJSYCZddxTcjgXvq2mZeBb0/msaLYWdbqr7us1nvWudDYICWNPfwYbRwnBjP35QL+9dt2unyy6PL/YwZdMQqxLNLxXEN/gOupZw9mj90XMr9SmrKjr6wNac/efhoZuvyh13/BiGp1e+K6NklI7wweTF9cuT3jfjtnyFZORAIN1zJZiJK/v+eWwu+qK9p16um5UaKYXNqVgnum65Fk21G+JyNPMY5pPmMFKEgtCLpMNX7nsut19/PmVFt6/N1wM13pjvOu31r9SKXS4tmzIB0e3L5/PiK51S3ukUVFqZ/jUlktrYsrcaVvihSO+NmJcpFcUE4m8r6+saR3YMV2H4wyHk40CACSrN1THVEyz0RMXM5uYLUTGN9eWNj99YG+w4Df/9iZJANOaXj3Yteq8kZ6Gb9g2/ZetZEM6G+pcyEwgRQt0doMgkqFmHswEWknx/CpHfTPTU//jg931q2lNryYC35FsVLzAh9dQamd4R7JRnbz+riFf63drzXlVWPzj17+xlGADWgMAO/Y9OS3PZYYJ4ApTeNn8KhhmmnACsq5ylRzKhv3L1g98gbc3SXxgb7iQX/j2pibJDKI1vXr/5pWJbE9DypJyT8wRf58LmIfyoSEiKWa4yFdo4IEpGFdwyMX/ABwW7/MN88ySMBWqmTIbGDOUC7Vnyb+xCXdluus/83R3/RlXpnaGo756CxhXpnaGnGxUS9btvjsX6q9XuUoAPO50JxGGhkBo5EM9ATRnCYAZRKmUeSS5Msagi/3QEMYXsBgQBBjiTwAA9j1JC7UanExC8PYmuaa3cLoN9zS8y3XsPa4r24yhmsFMqIsbYubeCdgUNjqMkkSeJUTcVbLGUyruWSruWarwv5WMWUJYkqjY6RcyWPMMvRsCBBHJdC7UoYH0XPWhGOEXIz31197/sXMdWtOrOQlRuk5bkLhvOTODFMnPZn1tihOqxzymfGgAxrmDVcNnF1NsmoZnP7P5/2DXqvMIYh8RqYI3X+F3MoMtSRQaHoSlnhe/5s6nmIsylQWW509S9e3wbHllJfbl0/D7GcwGRCJmCVKWgA4NMr4eZsbDAB4h4qfAlCn+eZeAZcw4gwhnOpastS0BoxkjfrHVeKY/b5m8O5cP7/YNLxp5N29vkumH/nJvzBIrMoEx5S3dDJiYJcRIPvyb2nW7fjIddQA1Y9/kwiYCekGaTnEcqXKB4fJFQ8TGUVKG+fB38WvufIqxADd/6QWldob7OxvOdiQ2EfCPriUonS3ZSZGaKRous6OSOd8gF5i7ja9/AmCHsvlXsdPOfuxwC4gBGr6tbnkmH67IB+KlAP8NBNXHXUtlfQ0/NDPSj1AUKKpAM/uZwFTZ8kWWwvcyPfXfzeVNO63pvWfMs12A6yXdVX+vUrSCglExV/HZsFGSBIFOL0XMx/s71Yx/KYG4EgCIuSBKG00RIARgQI8DAJqaBBbIXf9o59eaXr0nuTL2/IS6WhBaPVsuTWdDDnLhjLbvltqDEzFLZvLhyHBOf4uZv9o9NHDXWP+5XaNXkGN+QKnh6uMDTwB4AsAdADqGu1dfPJIP3yWAdyVi1vJKJi8dT32AQDIT6NLwjTcCeNVIT/2nB7NqC63pXXgWb8UNbQw/huJpSGNJGSCCkIhP16+ccQIAyYJt4mHyR0koFP2aAPTO840/vve7c/XfKSXbPVtemMlrDGaCwmaZoc0/1nJKm2wu+ErIpjPRsvv+Q+TUqHDhcm7f18vtKRQ7K3snjQDAwKgXYGqnpuZd9wC458mbVnazoY8JgY8lYqqi2YvHHhEUfmY6G2ohyK12VTNBv3Wkp/7mH/b1f5HW9OoFZ/JKOCKhmWlsBptxAjCMTGgY5ad/eRRgmE8uEEDvvH15o/f51KuBXn1wy6pLbEulHEWvMQwMZgJNIDFTzTyjPgmWlJYkZAL9P0RiU6z5rr7SKdnbCzT19hoqU5SljhyKc+H4KbcXg9iBRrH8hp2PAbgu3dXw9Zyvk54l3iYEaLiC6cvHHhGQNAwezATGVeJMx5afff2l9e8equM2auldGLLjC5czAAjQSZN9g9JDJc0jc58A9vUWLKYEP5ULmIvFjLKohkTRd+55/KnGaqKdw8UcYV69vNEQdE2vfvKmladVe/ZGED7o2cJKZ0MDIsxkF99onu8qmc3r3+dDk6ppOWQ7jX29PG1toykYYKcpi3R+C+Dtw1tXf1Uq2ZGIqbq8P3MNTAQQEclcyJwLQ1PjyHpB+Em2p/5f/SBM0Zre+T3oZU3hEDSMC4xmUNG1qfwRGMNgKqbNRcI4HszctUp7MWUR2b8w4xlLllznDuV4eW1MzJGnDuf8OuZDTrbzJc/nZFLQml695/MrrZHuuqurY/YvPFd+LDRsFVs6Z8yYwzAbZnAipqQgpEfyYftIQCtrWvq/wQwqfbaZCIuJCg1MpWdQvW7XT77fd+ZlmWz4YcN4JO5ZSgBU6DGYfohi/8BQXptcYNh15NstS+3JbqvveDB5cS2t6dXMoO1N86d/oFQ3OnBr3bOV4BdmAw0em1IxQDJT6BJ8sPyQnZMEQAROJiGWXHvPQRB+YysBFD37yxjdWJKgjfkgERjT1N0003k+b2+SlIKhVMoMdq5+7YUjdl/MtW4nwqnpbBAywDSDeT4z6xpHCcciyuX1PweBuaR6bX/q5PV3DfH2JkkEno1++tIzKPU3VLUMfHZQ4yUjOb1NCuTjnpJcEHmamSGCwi3EYCbUhlHt2mrTKQlvz3B3/T8Qgdf09mre3iST86J/oFEQwCTxjqqY5WnmcEzLPMCOEjAGj6SH/QeKOdxxE8AMawEKfc6DXXWpeMxqS2cmCoFAMLYkZLLhlUs37v5p6e/M6XAfwDOdDRd5Eu2WpLcQzbxM95CsVihHCWR8fZdvqG1JS9//AHNDVjtmavPWVS9ylEzZSvxtJS4401EHKR/3nvX1jjAwbfH1u342V57PEU//dvDQLZefJNzw10LQyUHIGPusOKxxlUxnw28nWgfWzBMtQKEVWAf8nUwunKy7qWA4SyRsW3710ZtfdDIV2yLn3MZH4Vrv4VtWLRvpbtjiKezybPGWTGDMsK+NoJlrjjHMWhAoHrOUNvzQUD58f2xt/+VLWvr+h7c3SU5ClNpmT+RzKoXevL1JLlm3++7Y2v435MPwjYE29yRilrQkkZmhtKB4bahyoTHpbKhdS16hLLkz01P/5QO31j17rrYVjypBCcxO+JkqRy4PQmPGryVmEAPEwHeA6dMC0Gx8QUrBDG6tv6Pak43DuXDCUEXDbGpcJfKB3j0S5N948vpfPjoXDEDKZboM0EhP/Xsk4QbXUWfPhky3EDoT4q4U2cBk2ZhPhnmzNXHd7mcAgJuaJM3R3olyF5z7bz/XOS1c9lFJtN5z1MmzYWV2SHasKOfr/dpw12A6uP2M1N7MbA/fOFqEDADprvquGlc2Ty4HhnEkUT40j/pGXnDy+ruGpqtgPmt+AMNdDX/jOuLHI4dpgjHMusZVMh+YPwWar0609n+/9Pdn+2pngky3c/XLlZIdriUumw2Zbular9qRkhkINH9HayRrWvt+PT7UnvM1k7LP+vTm1WfGLHk9CO9zLSErGa45HdHTIdmxvk8z2mua+3pP1NoCioNcthd+70PJ+qXL4rgt5sh3DeVCjcmj5DBeZanBkfC62tb+W6fTIHR2LMGSSUGplDm4te4HiSrrtYMjgRZicucT15JSEBAa8+2QdXvN2t37ZnPRl/+eJ7fUPa/GojYS9E5LCAznZ3bBlsaZO0pI1xbI+uYXQajbEq27fngiF+x0EGq5HmJw8+p6yxYdriX/KjSMbDDDeogx8ySAXMA/8jWSta19u2ezPpBMQrSPmS1Y/w9CUNKzxHMO6wYENq6SlA/1X2osfkH7/l3D7cVpWvOIACCQAh/sXP1sR8pfAEgEZrQ3YPxiKU73lSLrmwyDP3kgpzvPvG73MwTAzFDYWz4P/v7k6vjpCXGtAK31HBlPZ8IZ63QrJ7/SmLNcXj9u2Nz6YHrocxel7vPnSsg6DRtxTKfkUFfD26XgpOeo8zN5jeAILrnTRESGwUi4SmR8HRLocyNB7taT1//y0Zk8ZCYIwrasfqm0ZEfMFlfkQ0buCO7YAIfVjlKDmeBNS9bv+u50f8bZswUvbtwDm+veXBOT/5YNjNYGh+0aM8xaCpLVnkIuF/4ZjBu95v6voFTImab6wMRFWf8OJanNteV5mZxGYMyM5/kMIOEqkfVNAODzwxn/luU37H1svoX7x0K2TyQbq2viuY+DRIvnyEQ6E5ZmHMjZINtsXj/BwK0PDg5+dibIdszNyK11z7Yd2kSgq1xL0NFSIGYE8WrLOpj2P7lk/cDV89YWvIRS7nJg8+qP19ZY24Zz2hTayiY/WSdcfQXm5ybUbTWtu/73eEO3CWFp1yWXWkJ1eJZ8ha9nQaZbFpZKQcgH5kd+ELbVrt+9ZzTcP0Ez409EfeDg1pXPtZTdJgn/UJhyNLvpVs43v/A1komWvh9MR7pVTiSPJFfGEnHrGimoxbXF0nRWM/jIJFfY/MoaGgm+X3PWWW8CgJlYD7PeeFMigf1b6z9W7YhPGGbkAnPk6UBFkUu1q2QQGjD4/+YNOmqb+/9wLKdkue/A/s0rz3Js6wYivMdVUpyIwhQDyaq1fd+ez3n+9BVc665QijpcS760FB7P5PyD8QXXUPN3Qub2mub+X5U28lSigQkRZXdDkyS0e45cUUmaU5q7WFNlqeFM8IMDoDXPWtufA4CZWBMndDjo/i2rXhez1ecdW54+mAmZjhL6GWZDIIrHJOV8M6gN92RDse3k9XcNVeooW7o++XVyhf2cROJqIqx3bXnSbF9NZX29H4zOA4P+J+bS1dSJSwsOXbkCoOGuhquEwCbPlc8eyc6c7Lg8FStdueYCkzUGn3zaH9589sZfHajkym08kR3sWXWJDdXhKPFqzYzM0ceBFaJdKZRjCYz4+jO7B51rrkztDGfSKOeEjwd/+qb6M6pidAsJ/EOllXbDrC0hZMyVyObD+zUjVdPc/y9HO0FLxcjBrrqXOIL+zY1ZZw8NB2DwxA7FaS4+jcp0A8MM/qqf5xuXbBz400LN84+nVoTeQqj7ULJ+6ckJamHgGs8WsXROGwZDYGaLsSg0XYl8Xg/mNd6ZaOn7IScPf7iUv7+ntrz49CrL3cjgD8YsqQZzoSmMZj78Z2YukFu1p5Dz9SOh5vU1Lf3fKEmyZzIaPKG992MKJJ2rX24r2RGzxGX50CAfVjgqvCiBzYbmv4MgbEus2913uPpA6YEOdTcuE5T/sCC62rPFssLQjYI33XSHl+XtqRnf7NDGbIq3DNxZIKRGhUUyFed41sYzm1ddGLNVUkpqEjPYdl2wrGNT7SqZD3QOoC/l86a7dsPAnycLwcuH0/46ucI+u6bmQ0qKDa4tT60koixpJOKFArAP5s+mc3zrqdcPPLG9qUk29c58DeiEi2/G5Uw03F3/j5KwyXUr67Yba4JhDBv+Uo7Dm5a17PnL0U7Xg93151qCbnYkrTGMwn30NDX4jM7FcxWy+fCPhtFR3dz/9dJnat/Xy6lFGu4faz493Fn3aiGow3PlJTnfwJ/GhizDrB1VGMudyZsdAXh9bXP/roo+V0/DayWhw7XlS3K+PurnKh1eVXah5yUfmh/kAySXrO//xWxHhHNGfcdNTVL09moG8PAtq5YtcWUrgT5Waeg35mrH10+DseWJQftT56R25ibJr+mOMUadDW+0BG5xXXnBcDaEMcdeCyivU2TzepgJ2/L5oHvphr2Di2nM2bTXB4on7Z73r7QuON/6gBDY6Nrq9OFsCMPT8b4U5Xz9mGG0V63t+8Lh0skxcxs7Gy6SklOWFG+uVBBmmLUthfQciayvf8WGk1XN/f9+ogrAc05+O+YB91x2oYROWVK85VgecC6v7w2Y2+OHecDlC+uJ5Irq6kR8AwHNni3dQ6adlaUFhsEAmxpHytAAoTH/GgZhKrF+z/w2qZija+OJratOrZFyAwR9yLOEnc6FxTSusvpAefU/NAytzZcyoUyevP6uRycrKJfrLgZvWbVMeWodAR/zLOFVMrdxTKOXr59mw1uffhifOmtbf/ZEFoDnpP5+QojVXfcaQaLDc8TKSkK/8SFWLjQ/KEpnf1m2kAyK+VX5wtp/6+qLXUfe6lni1fmw0Pd/pALhmOqtLZDL6/7QcFtNy8DCsKmaa2tjXLX9wJb6l7gWUraSrzPMFcmOx1zD+nqPDrG+prVvtLekvM9+giCsu+69kugG11VnHVOKyvzlvC9vWrrh5w/NhYNhThtwlDPjnvevtC54vvVBAl3nOfLUSkK/CUUW4DPprNl86vUDT4x/+OMX1nBPw7sk8Y2uo84eykxe0GFmLYrditmcfjgE3/zjvv4vrunFwjOqnOOHRLqz7s1KUspz1EXZvIY/yX17+XrI+eYgAzff91v/9ku+sDeYEB2OaxQ70LXqFbaQHTFbXpoPDHKhOWJ/woQidaD/JzBhW6Jlz12jB8McaPSaHzPmyzbq8NZVp0plbWTwhzxbWIO50BAqv2bJ5sNHmenmXWn7C4WRTEkBpEbDrzEdXF0rT0qQahNCfMRVQqRzoSaQKFqcF/UKOsfApwezuS2nX3/3wrOqnhf1gcL7eqi73lvK+JgQtM5z5LJ0NgSKvRcAa8+SqlB0428N5/iGU64rNpKN05eUv7/BLXXPUzaSksQ7ju2aWv9eGx7r0ziHIsJ5M3hxQqNFV91KW4gOxxKvMebood8EpV1e7zaMturm/h9PWh8oXwRdDZfaAltcR1yezRsoSRAE5ALzPd83yaUbd90Tbfy5c0js33zZWa6tbwDRe1wlRMbXqCpEab8JQ70xvm7X90rhfvlVcblG4enk6ngsIa4l0Fq3QkHY2AKwSRtwz6ODZtt5qV3puTr6nObN5i98WB4f+o10171FELW7jrqoklbLUrGu2pHSMBAY3q7zpj2+YeA3E9KCst/Fhe60D0uBFMCPseHrqxbJuKr5dEiM1Xc0XKoIN0uJlVrzbQ+m01svSt03PCHqG7emMj317wAo6bnyeSNZjdCYivL8akfJwBhow/88EnDH8vUDvy9fU+XrOCKAikO8gpfAhM05LvQ7CXw1kWh1y0K/o7YV06jbzghrfCIIZGftxjsPMEBoahKlsHB7U8H0Eih0eoVCD57Weu/IYm/fnaso190zQNnOhrNirX1/nqzuM54wLMEVC8LGi9Vygfl5yGirWXuooHhF+05NBD7cOo4IoMIiz573r7Qu+cLeYAJ7l4d+nQ1nuwo3MOM9XgVyy1K+dqhhRz9o2NxY3Tzw1dGT/ZDsmLgsBYnC/flQHxi76Q6X4u3fvPIs17ZuYNB7p7JuRuXq+fDPmnFT1dr+L9M4ufr4dVyyAZsrh8fc6wMYl+sPbl3VoJS6lYAlRpsN1a0DPxqfv00wXOipv0wROjxLvrySCbwTmNzXPw0YbfHm/p3jK7bJJMR0OrJEmIX1lARNVuR96Np6b+kZ+JiU1FqpIMyADVXo0zhG7txdv1oBnYKQCJivSzQP/L+5kD7OKQIof3j7N192luvo6wF6ryOFMMWpIqE23xzK6eTy6wrz7sof8njLpaHuundKIZKeLc+tZJBluezYDw2MwT8FFHTUrt3zQHTqz3MiGF872lb3ZuIjXxuO+/vjZcP/ltFoXzaJT2N5H//jN9edEo+J6wH+kKOEMsXzPtDm3zRksmbtz/edyLU1d1qBiw/gweTZ7inx0z5GgtaVs3JhSBIh7imRy+u0ZnQOPTqy7bTuibl4ueniHzevTJxq22sJfK3nyJpKBlkWJtqQiMcUZfP6IMh0DR10bz8ltXN4rlZzI1RWGDywpf4ljoWUo8TrTAXzCiYYh+TNXl8jmWjtm+DTOF7XMtJd/34haJNryzMmrOMyy7tnBrH1rFT/fm5qkti+yFqBuTiCkgh8YMuqVzi26vZsefHhWPnQLLyCmUaozaZ468B3jpbnPdm16rwqoZJK0N8rAQxVMMhytGPMlcjmwt9q5lRN88A350LoFqHyQwUotg5bcgNQeevwZD6Nserws/SBvUH5oTMhBe1seJklcbPriMtzvkF+kqah0RqCq5D39YNByBtqWvu3l9KU2aoNnFg58KEvSiM99R1SiBuUAEb8o+Ts5XZaBTXVd7WmTZPZZo8P/Q5urX+lo9Dh2rKhEovvsY6yhKyvfxIabku0DgyMr0VEW26uFP/GiofOP9/6gBS4znPUaYfr6hx76o/zaSTzueGR8NbJfBrHyJZvvORZXrXVBuC9jiw0DfERDplS7clVUlmSkPXNl37/6MjHX9R978hszXw4cYYgxQrt/s0rE45t/XPMVa8byoTGMKNS990xrZ2ByRhjbssH4daS8g7t44o/9zUR9fbqZBJiXaLhvQK4wXXlsypRABZn8hUWRaA1gC9kGDef1Nz/SFQfmJt5/nBn3auFog7PVpfkfD3pSXz4g4WQD/SP/FBP6tNYrhEoksxHJOE6z1Enp7PhUT3/Jqs9xassmc3pXQdHsOb0TX1/no01RSeKoSkF81iyYXkiwT/wXLUqPRIGIFjH8oFGr/IKLq9/0IaTh3MIKn+oj3StPKlW2OsE4aPuMam6widDzVses5759HnX/CEf9QXMjXA/3bl6hZKy3ZLUNBUVaZlAaB+HaK9qnejTOD7cH+5Z/dcS4ibXUauyeY3AmGN2lzLMYcJTKu+bP4344euWbdi9b6ZJgE7U5j/YXb/UFvRfni1eMpgJj2gKWiGLjoZTtiTkQ/PjnDY31LYM7D3aghnqrn+BJEpZit6ECgdZjtF158N72HBb1Bl4Ajb+0SzEjhJRjvdpNIzOwQp8Gg9uXflcR1ntQoh3SjF9LkXMHFY5UgWaHxnyzZXL1w/8vryfYV4TQClEw4EHxNCQ9Z81nrpyMBMc9+afNJxylcwGJgvgy4Rgm3vtngdLxcbDhoxdDa8Tgjs8R70462sEU5AdEwF+YL6Xg0kubR6jDRiVHUeY5jy/3ER0W8NVgrHJc+Szp3LlW/JpBPCVfN7cdDifxpKd3PDtdcuVFh9iwkc9WyxLZ/W0D41h5rDaVSob6N/pnL4svnH3/vZ20Ew4SM3u3PTiZksPyttqqtSV6UwYTOfmLzKaAIB0PjSeKz0p8O4gVBcTgdGeHLORicC0pldzEoKTSVHd0veDBwbT9cO58FpiPBH3LEUA8WEm2lKB8mUm0GbEN8Zz5BtcEgPZnvqu9O2Xn1xcQHNuIu283vgFNydFKRha06uHOuuuGOlp+GmVJb4sBJ6dzgahZvDhNn+RtENXCRH3lMwF+o7QmJfF1va9d8nGgT/dkWxUDNCEsDtZuMAzOT4HAu/xYmrZUE4DxHq6J0YRkRrKhWGVo85nW/5fAGi/sIl4Bg7s2ZsMVGTUA1vr3pKIqW8P58IQ0+zEO07/n2fg0wdy4S1nXrf7mYqsnce4u156epVtrgPwAc+SajAbGirEd0eWHRevdnJ5/bAB3/zDvmd9cU1vrx7fwhzh+PL8g1svfa6juI0I/2ApgeGptn37+g/G6Burm3dV7NNYWkP3336uc2a47OMkxDrXlkunWvSbSiQQr7LUwRF/3ZLWXZ3zdjJQqSKfdlYtEY78lZJ0qh9OPhvwGH/+mFA8F/D3Ax22LVm3++7yukOlJ0x5K/JIZ8MqkuhwLfGq0FTm7z5WdmwGtDGbSg5B5QKRaEtXGu6PHSVWlfCvlcBa15G1lYwSGztPQg8Zg9vywbH5NCaTECWSOLCt7tkO0yYQ/aM7A9OMmMFKwhAQhIZeXNPS97vytub5QwBF5jrYWbctUWV9fHBk+vL+scU4fW9okIy39H33eItxEySi3Q1NJNDu2pVNeClZTFc5UuqCR+A3M4ZSJ7f0/XayHDPC0d/B6DBRV52fyVUu/R7j02h0e6JlYhv5VNOQ8kMi3bP6pQqyw7PFFaPak2l0K054Sg5mwh/Urht4/XQXBGnm2bs4jGPryucoaf0aBFsb0PE+nLFdWuFTzLTlifSjnz4n9efcdF7Hlf+sx5pfWJU4PXY1CK2eo5ZUEvoZZgMQJUouwcBtTw5mu89J3XMwcgk+/AYbI9PtXl1vUXGcuGZkgqlN2cn6ut833FY7zT6NE8Z999S/mxhtMVc9p5JC5BSeiHYtKXM5c0V8ff/O6Tw8Zp4ASqd/V/3tiZi6Op0JjmsKz9iGHKNB+CLn9c1VG3Y9PJMn6yRTXtuKU14xJdmxp5DNhX80wI3Va/v/qdL8czHm+U9vXn1mzJHXg/l9niVluoLnXF6Hyeb1w8x8Uyzd/0VKwcyUT2O59uTB5MW1yxNeMwEf9xxZPZjRjOO8JWBmXeMpOZgJ/t+SdbteO51RwIwSQGmm2cHu+qXS4HdS0bIgZBzrXalh1p4lpS0J2cD8V8CiLdH88/7R3HqGW3Inyo5Xv1RC3hizRaMfMrIVnkylSUFZ3+wIA90WX7/rZ7P1HeZunn8o0ioIwk79CBGtdx11cuVTdg75NBLhUwcyua2z6dM4xkZu26XnKzbtlhBvE8U+geOIBpgACKJQB+bi+IaB30yXXmBmCaBofjDYufpd8Zj99XQmOOYBDsys456S2cD8QWu01bT0/et0hnNTXqzjQj9BaPMc9ZxKBlmOu4MGwF/JL9JZgRNkuj2r3yBIptwjCMKOVAD2Q/NdHXKyZt3AvSfiWU7oLdm6+q+lEje5jlw1lNWaAXksm47BYTxmqXQm6Ei0DCRLe2tuE0BR0DDYVfeduKveOJQL9bFc/TGzjscsmckF2wPf+mDtxjsPlAs+TtTiPVLoV7HsuNSFlg8PgNE5aDKfWCR2Y2OmMx3YuupFjpIpW4m/5QplugBrSwrl2RLZfHg3A21Va/u/f6IOhgmHRFF7sufzK60Lhq3Nni3XjuQLJHAsdYCYLeVIXv8yPjxwCabJlIZmkglL7qpWtbjfUXRKPmSeavhfOvmHc/r/1rT0/0N5ZDEX89Z0V8PzLcFJKcXbBAGFF16h7NiRyOXD+0Km9prmvt65sJBn+nkNdTYslwIbQPiwZwtnqjLdbD58UgObf/bg0595zSf/kJ9r/RblAqKhzrr2ak8li/byUyIBBlgQCIzA+PqixHW775+ONIBm+iUPbl3V4FjqrmPa/EXWy/rm7oeG0nUX4r5wrp6KE2XHq//aVrLDc0Rd3q9MdgwqeNcrQcgF5se+Rltta9/uhVIfKI/atjc1ydfWPfR+IcX1riPPmJIi01Oi0I+Bz2cYt8x1RWahD6ZRFtLh+u/WePINQ9lwyulwqRg4ktHvqFnX/y/TcRDOXCvwviepUL2QFzu2BIj11NmJyBhAB3ztRan7/B1oFHM1JB7fVly7btdPftDXd1kmrz/EjIfjMUsJOnJbMYFUNjAmnQuNZ4lX2ZLvymyr/9RTWy49/crUzpDmaVsxM4i3N0lKwVAqZQ52NfzN6xoevivmqc8AOGNwJNCGwXSE9t1CAViIQpen/s+AcWlsbf9HTmruf4S3N8lJ23fn0NrovW8nM0AG5tqsb0akIMFTJXMCkyAw8Yun67PNghaAzz+2OIN1lS1Fxtf9SzYO7OAkxJVzKOw/7DsqLnLe3iTX9EJXre3/XJCVL8lkwx5JlI97SnKhR8UcJiQTgkikc6EODZRnq49UWfyLkZ6Ga36dXGEfIplZ1nEcTyRYJMd0V8PzR3rqvxlT9GNH0erBTKjzIbOgw0dGhlkrSZSIWTLU/JuRfPi22Nr+V9U29+/i7U2SubDx53pktKYXGtubxJLWXQ8Gmv+9ylVEmOKhyCAYhmGcDwC99y3nuUsAFxY+HIGeBebCh59qzqMIkvDdwr9pnBcLfnQjF1VqvL1Jxq+/86mq5v7mHOu6bKC/V2ULEbOkMMyaefKFS0SSAR7MBBqEU2KOvO05iXj/cFfD6wokA1PaAHPx+29vOrQ5D2y7uHakp/4mS/DumCPfmgkMD+W1EUTysG45zJoBTsQsScwHR7LBDYO6elVNy8C3mEGcTApa0zu/Wqr3PUnMIAH+d1O4vpjauyOQMQxBdBoAvHUaGshmMAXoLbwY4iXHFrST0IEBMe0tJ5T5Fv3Sml5dCoGXNu+6J3Zt/xszYfjGwPA9iZglLUlkCmkBTxINkCCSQcg8mAm0rcSLHZu+n+lp+M7+zfUvKG2AuZQWcBKiEP0UPttwV93/ceDtjTnqes2oHsyEWhTK++IIeb6ucZW0JVEmH34tb8xLqlsGbj6t9b9GRiOKeWnKurNgKmLwq5GcDoQokPxUGEAX/K1quaBaxPEqBGeOAFJFBx5GzBRlVFOsTopMYBhEj48hlHmIsfUBiPjaXd97WDxVl/WDZoCfSsQsiQpkxyO+NhnfGM8Wb3Js7Brpadj6SNfKk4ohcMEc40RtfJTl+Wt6dbqz4WXZbQ07qlz1VUniOUeV6aKQ55dkutlA/zQI0Vi1tv+qJa27HjysTHc+ob24JxQ9AyCtxNQTl2JYbT+KYXt+1ACI6BgWE1Nx4gcXOW8hoDx0P++aP+Rj1w70ZHzzkpFc8DkloOOukobZMHCY+gAJAsRgNtSG4cYc2VorrF+MdDW8vy0JQb29mrc3ydmuD/D2JknFaOdA5+pzMtvqv2Ip7HSUaExnQ50LjSGQOlKeLwmUqLKkZn5gJBdeVbW2vzHe2vfT0vcpFUEXxELwFR8u9ZttzNhCaU8WXrYAsqXNPIXTn5hhPEsQIE8qpABNtGCIoDiz7o5kozppw66Hq5sHPhRoviwb6p/EXSU8SxyxPiCIpGFwOhuEkuhZMVd8fkNt/c+GuhpeQWt6NaVg7kg2qpmuD5QX4R7rfGHVcE/9da4Uez1bXeVr5qFc4arrcL37htkYBic8JQXRSC6nb34qJy+pbhn4GjNoe1PhWm/BNEO1F96HrXQc4GptMOUAvnC1hvB0ZMO5TQDFDcvMB+kYliGDjWUJGOgXMkCla8UFQwIAX5naGZbqA4nWgYHYtf1/M+KHbw+N+W0iZkl1qD4wKUkSSOVC5nQ21LaUl9oK/53d1vDPg12rzrsytTMs1Qc4mRTT5SZT+ryj1XcCZ3rq1yRk1e4qR91sQEsGM4EmgA53rWcYzMy62pEiZgvK+OZbGd+s8tb23XD2xjsPlPL8BaeSLLr6+ITnVznS1WzM1FSxDCEABtKUus8vraPj+Uhqxr5sccMS6BEUjJh5igxAhVEr9FoCPsW4wgA7sdBQqGIXHYPaU0w08M0nkit+YOI1H5dEzYmYdUTTi0IVneRQPiyZXryD8/Jvh7rrPhsE6tO0pvehQwW6RoULl/NUOgtLs/V2oFFcceFyJurVQLGLr6f+lZJ4vavkK0PDKGx8EkfK80szGF1byWxe7zIGbdUtff9ZiigKn23h6iAI4IOGXyOVBHxtpnQIM7h4bfJ4qeA6dzsBS0Kgrrpr4jHrtmOQATMBkJKCbD58ydINu+8rH9m9UDHG9qrn8udYpNsE8G57SrZXhclJI7nwIJi+JYCvbxnq6x8vNy5MsZ08stoB4ArsNOMXWLpr5UmKrNcY4D2WFC+zJGEoHxqgArs0Kk7T9fUjgcEte9P2F65M7QwXg11aqS4z6F6eUHbwWynEcn+K3bEMDuOepYaywafiLQMfm45OwJmLAIrXdob5V2FgAExZD02GWVdZ0g5DuZWA1/KKwj3qQrbTKtUHdiQbZe3anQ8A+D/p7vqvGl/fGPfUS/3QIBcevq1YEEltmAczgbGkqI258gO5vP5AS7z+7rVd+E8pxP8iDO6tXrf78Uoq6nz7uc6QWfYc1qiTRH8Nxss9R57CDAzlNOeCIxuijMp0PSWzvslnc/oz2mBzvLXvyUOEl1r4ysfTV0r6wN7g4Fa/vcq1lw9mguOQB9M90xiRzBDjFTdqumvlSWD1eyVFbaCPXQw0mAnbatcN3Mjbm2RvL7AYXHQmyI67G64SAps8R55Tkey4qC8ASMYsQcoSCAODTGAGwfwAQA8w+C8gekoyDxfiUZIgrgXoVMM4h8DPZeDsuKckCMj5Bn5odCF9mYpMl/8jH4bJUZ/GRWKZXjj5GwWldoYHu1a/PWapf8kH5hgVgWAhwGDzkurmXffM6RSgPEdJd9b/pMaVr0znwik7pzLAAjAxR8qMH6Zqmgfax+aLC988o3zc9MFbL19iObqVCFd7tqhKZ48+/OLQSQwDkLAECVsRpCBA0OiDHrMquFCt8zXD1wbGlIqRRx1+wYbZzIRP47za+BMGhta/x7LwOWMgConclDtjjWcJkfH1/Yl4eBF9YG9Q9qbmKgEUcpSh7vqPVrvqk+nssdmBceGDmhpXikxe/4SZNlS39P1yMZ0k4+sD6W11F1gQ7VLQGlEaf1WhI20xMmAw+IjFWQYV+zgq8nCcLZ/G+fSeDnSuPscWIuVa4l2ZwECboqx3ynugYAgyNBx+Ir6u/5r5YQhSjABGuuvPMMDvBBALC/dRxyYPYtbFiT8+mD+rc3xrzfUDT4x/6At6cY13nOmuf5UgdHiOXBWEjKyvNRNIgMQsfR7m4g1F3JXI+lob0JfyI8HNyzbt+cuiejdlxczHml9YlTgzdjUYrZ4jl6Sz2oCnfvKXP2dbEfl53ZDYsKt/up7pzJuCllyBOuu+EY9Zf3+sUUA5CQgiWR1TyOXCR42hW3YN2Z9fLNXksbllQVt/R7JRrUrk/48Amj1bPt8YxnDelPJ/QdPc78EAo9CxiNGBmnkNAP/u+7y5dkP/LmDxeBxOsC/vqV8jQe2eIy+oxEK+gtNfVzlKDGfDgUTrwKXTOSZs1gjgwJb6lzg27Q41l34vHc8CLB++kcvr3ZrRVt3c/+PFVh8oPwke6q73ljK/VQp6H4gudW2JIDDIhoYB1lMN6SekDIABg6QgGbMlSBAy+XBQEH3XGP25quZd/Ystzy+fD3Cws2GVPYUhMlM59Go8JYez4VvirQPfmVe24KUi1preXn2gs/6btTH11uONAsaHn9WOlIYBbXh7ANMev3bgN4sq9By3EAEg09VwqRH8VjBeLQU9z7UlwAw/ZATaFGTlhU6ro9UAhCWIbEWQUgDMGMmZLAR2EZvvEOt/j7UUQ/1FmuePGSOnpBrMHX2M3FQ2f5Wr5FA23F377LMasG96bc1nZzJQEgLt4MFtl5xjQd0LkBdqpuNlxhJMYThH0RLaZBi4PcjLztqNdx5ggHqbFsfwjcmI4P7bz3XOCJe+mCEbGXwpG74IoDNcSziF0aeHiQUK8jzkAoPQ8CCIHyAWvyDBPwtDcWfturv+WL4ZsG/FPJXoHnvq9evkCvvsePzDkmiD58hTKrEvn/orhXGUkCNB0Li0dfdPp/tQm/XhoPu31F2zpMa6LT0ShDTNk4HHDH/M6z8Ro8Nr7vvqoUU6/UMh5iq2NzXJpqZRY5JD7+H2c51BfeoZUgdnGcaZEFgumGtZCA8MMswMpmEQnhGCHzMB/SUv9EOnrNv9+IS8t71RtmOnWQwDTcbn+YOd9a+3FFKeXdko+WNcz2GiylIHh4JPL1k/8NF5Oxy09Lu4eDod3Fr3g0SV9drBzPTNCBxToAJrR0nlKEIu0D8LQ26raR3YMUoERZfWxUAEpQioacWTBFxhjueU5u1Ncse+J2myFuHFEu7v31r3QtcS7bakN1ViX348h1mNq+RIPvxVTU1Yj0dflysNSJ2vBDCaCqRvXbVUuvIuT8nzhvLhNM1Pm7DwDZi52lXSDw1g8E95kh21a+98YDHVByZNE5IgXNhEhc18BFy4nHt7gdLsg0X3rMrWyCNdK0+qJWs9ET7q2dKtxL78eFJa1xKCGfuHNS47uaXvt9M1CeiEEkCJBCgF89SWS86vtq0dStCpGV9PezpQXkQBSMRjinJ5fVAzukfS9m2npHYOF8LYJC2G3DXCFA+q4lCPZBJiXaLhvYJwg+vIZ1ViX36869VSQgpCLpvXr1myftcdM3lYnRCNfekLHdi66kWepX5oK3F6OhdOezowPqSypJAxVyKbC3+nmdtrmge+OZoWNC3OUy7CuOho+5j7/FcqoMO1ZUM+MMiFRhORoBnaNwwOXSWVAWczPr952br+H9+RbFQz6YZ9wkw2SiTw5C2rzqvx5L+5jroonQlCMMnpzqfKCjnMYBOzpFSSkAv1T4K8SSY27Jq1AaMR5n64P9i16jwlVFIJ/L0SAsP58KjTnY67blUQval8aB7L5PVbl67f9bOZ3vwnlADKH/qfb718yTI7/EKVK/8umzcIjJmWPoEj1QcOjRjXGkxfzAT65pNmeMR4hLmH8vmOf9y8MnGqba8l8LWeI2sqme84HZGpFEWfhFz408F8eNWpG/c8MFtr8ITbbJUXN0Z66j8oiG5ybbnsSC4405lvlc2YewrEmx8Wz3z6vGv+kF9MTS2LEckkRHu51Lqz4V1Coc1z5LkjWY3QmBkpTpeF+wYA4q4SucDkNPPm3YPOzVemdoazeQDNCZ+9QjEORCmY/Z0NZ7uKkwBd5SqBoQpccKaDhUflq76+Jwx0Mr5u1/ei+sDCz/PTPfWXSeDGmC2v9ENGLtSzkoaO+iQE/P0c9KalzbvuGX8gLhoCmCwPS/esfqkFeaNri8bRFzPNjRZHfDHafM8Yk6wuvZhFJDteDHl+4aDBDWC8x7UEzfpBk9f3skGyqtwn4QT0p8w5p90JoVlP/bsFoc2z1XNGcrMVmpXainWegU+nNW05bYyFVVQfmFcbvyydeyS5MrYkrj5GQrS6tlw2A+27R0w1c3n9lDbY+tSQ/alzUjtPuE/CnLXaLi/OPJi8uHZ5wmsm4OOeo6oHC/WBGS3OMLMWgmS1q5DL64cDY2758cDAF9b0Qi8m2fG83vjj2nfTnav/TinR7tnqwumQ6VaQbhgwc42rZC4wGsCXsia4eVnL3PFJmPNe+2PSgq6G51uCk0KIt0kBjOT1zF/PgLUthSrIjs2ABrVVr73rJ0Dx2rB9p47qA3M7zx/pqltJQnQ4Fr1GG0ybTPdI6SSItaeksiQhG+j/YjZtJbn0XLpunhfDNphBO9oP+asN96z+awnZ4TqiLucb+DMgxBibu4EJbKqKsuPAmG9qTal4S99vo7Rg7h4YT9608rTqKnsjGB/0bGEN5kJTMKKY2Wu9QyYp4e+0oVRNS9+/jub5c6ygPK+m7ZRLMbc3Qb6qru79lhTXubY8czg3sy2axZdrAKJETFI2r4cJuO3xwWz3Oal7DjKDetcsDtnxXF8bez6/0rpgxPogga7zHHnqbOX5pZbzbF4PGqD7LwHddsH6u4bmcsv5vBy3Vc7yj3U2LI9LXk/ARzxbOumcNkUnixlleSVIVhX6Bx4wjI7qtf3/VPps7ft6ORXVB05Inj/cXfcaSaLDdeTKnK+Rn/H23UOisyA0YMbX8yF1lPwS5np0OJ/n7Y3KiwsvfvXFUoiUJcUbZlKmWV4fYGbjWVLaipDzzc4AelN87a6fzbU8bzGE+890NlzkSW63pHgLlVySZ/j9l8vOM76+0xBvqrl2fsnO5/3AzQmV3p7Vb7AgU64jL87mNfzZrfSCwV/1tblxSeuuB6P6wAw986YmKXp7NQN4+JZVy5a5spWJrvYs4aVz2jAYArPQvls0njHMN1U3938FKAxjnU/GMwtm4m75fer9t5/rnOaf/FEpeb3nqJNnLQckEnFPUTYfHjBA15DO3H5a670jUVvxNL7jYo8IAzTSVf8eKXGDa6uzh3Mh9FEmJR33xgcbQpn1HPMnnkmj86xU/34GaD7OrqQFt0jKTtynN68+M2bJ60H8Ps+ScjrNGo90OpSqwLm8vi/UnKpp7d8+GhZGbcXHEmWNmbIz1Ln65UrJDtcSl+VDg3xoZqVLtNqRkhkIQvNtHej2mg279833KI8Ww4IZ6ayrIyludC3xV6FmZIJZuge2pFKCkAvMj32NttrWvt1RfeDYCf1gd/25FiEpid5pyYJMdybbd8f2gUjk/HCPBrdVXzvwo4VC6LSgF8+4+kCmu+5tIGr3XHV+Jjc7nWAl2XEm0CExPj8SiltOXn/Xo1F94GjhflKUPPCe2nJpTZUy14Ko2XNkfLaUoqVx5lk/fIwNbvnN74LPX/KFvcFC6gSlxbaYnkg2VtfEcx8nEs2uI2tnX3asn9DMm/+cTn/motR9flQfODJpD3XVv0NKavNsed7saUEKMt2sbwKAPzsU6ltLrsgLjbRpUS2uspeX7bn8OSDdBuDdthIYzs18OMnMxlZCerZENh/+0hhqq27p+0FUH5iYtg1uvbTBUuZGz5KvCGYpbSupQQUB+cD80IRoq17f/4vR97MA3aRpMS60Mb5vnXVXKEUdriVfmg8Z+VmSHY8WlDT/u2ZO1jT3/2qxpgVjZLqbV57lOtb1AL3XU0KkZ12mG/6aiZNV1w58ZzEQ86IjgENpwaErJQAY7mr4RyGwyXPls0eyIcIZvlIaJzvOMeiTB42/9YyWvU8TALMIiKA8/Xno2npv6Zn4qBRY59rqpFm8upXxQmr2DMBbn2Z88qzm/uxiSc0WLQGMLoKmJoneQmj3ULJ+6bIEtRBwjWeLWDqnDTNjVjzhXIVcPvyLAd20dbDvS6kUDDc1SaxYeNOMxuf5I931byJBKc+WL5j15q3QGDB/OefLm5Zu+PlDiy0KW/QEMFkY+nTn6hUxKduVpCYxm22lUijHEsjkdV+g0Va7rv+/gYVzbTg+zz+wpf4ljoWUo8TrzGy0bxfTL8+S0paEjK//V2u0xdf1/3whPeeIAKbpZBrurn+VFOhwbbkq55sZF5YYLozkrHGUDA0jNPwvoQlTiZbd98/3k6n8sw/dVncKadooiD7k2cKeySk75ZGWEkJWeRLZnP69ZtNR0zzwz6XPtlgFXBEBHDY3LUhL70g2qtUJ/wMCfJ3rqtOHMyEMz7zsmEAUL8iOhxi07XHf73nuhr2D8012fNhn6ajTh7Oz/SxNGuCezKDZdlJqVzqaDBURQMWn1uM3150Sd2kjBH3Is07AqZXXf9CGUjXNd82LU2vSaIrQ4TpqVc7Xs2biUu0oGRgDzfhG6JtUYv3A7xdbnh8RwDTmrcNdDS8WgjtmM28FsXaVVLYiZAP9v2Ewt/PW8fWUKiWTUtCaE1FPyfn6rpyhtiUtff9T+myLaTp0RAAzdKKdyMp1NjBMjC/nDG5a2tr357lyom1vapJNxRuVg7devsRydKsgXO3aoiqdncUblcKUnYc0802d6YEvp1Iw802mGxHAnM5px99d0zrXlrN+d53L62c0m879oE+cyLvrcT0VNNy1+ioSclPsRPRUBCbLwCfDbLg1cd3uZwiAaWqSFFm1RQQwU2Fuefeaq4SY9SETuXBfCE7Gmwf+bTTMnYXutfHpUbq7vtESuNG15Etnc5hLWVfld7RGsqa179dRnh8RwKzXBzLbLm0AH+pfz87imClBQD40/8833FbbMrB3pusDY2S6Wy99rmPxJsyyrsJRQrq2RNbXvzCMtuq1fT+cTQKMCCDCpPWBoa76dyhJba4tz8vkNIJZULAxUJh27JvAsPlcJhveuvyGvY8VQvRGhWmYXzD+exaUlf7HiXBClJW5vH48NNj856HBz0bKyogA5kB9YKyG3bPMWgFa6zkiPhujpss17Dk/fMwY2nww7X/pjNTezOjJCAD7ehkpcCWRQWlUGwCUNn4yCdFSU/92IbAp5qjzZ2fKDhtmIOEpkfF1SKDPGahbqtf+7LEo3I8IYM7WB0ZdbETRxWaWw+NMPvwtQJ9jqO2lzTL6Z5uaJFY8OfkauHA5j99QB7Y11jqcf4NhfKTKlqsCw7MyZYfBJmZLWXBX0j9iiLaqtXftmek0JyKACNNWHxjqWf1yRbPrYwew8WwpLSUwnNX7GfwTA/wAQdiXyO35UyWh8sjtq8/UebGKBF4N8GuqXXWGNozhvJ5Vf8VsXt/HQLJqbd+3ozw/IoB5lBaMuyLrqX+PJNzgOurs4ezMO9mW+gcsKaRnF/bqUC7MMdMfBfH9mvFnAX6SSAyDwUyIgflkEM4C43kgPK/KUdVCEPLFQRsg0Ex2QJY7LOd8vZ8ZnQcG/U+ckdqbifL8iADmJxGUedkP3rJqmT3LXvaliAAApCDpKAElCRA0yhRjVgQztGbkQ0ZojAFgiptezDRZjc5YYP6K7/ONSzYO/CnK8yMCWHD1gaHOhouU4nYlZmeaTXmdAACDmXG4EJpBIBCYaMY/z7h254yvd2jDm+ItA3dGeX5EAAuPBMZdpw12rn6tLWXKdcTK2Zh2PJcwKnhyJbL58I+G0VHd3P/1EllGcxYjAljY9YFiPrvn/SutC85XHyISG2drou0J3vijk5Zzvh4yBrflg6B76TyUPEcEEGHa0oITMdN+djf+IZluaBjGmH/1gzCVWL/nd1GeHxHA4iWBcW7FB7esusS2ZcpR8jV6Fu7bZ+H7lU3ZEcjmTb82pq2mZeC/RvP8aehWjBARwIKqD6Q7V/+dUqLds9WFs9FxNzPfibUoynTzef0XP+RbfrzrWV9c09urmZMC7anoWi8igAiHqw88klwZSyTsqwWh1bPl0nQ2ZPDM9txPz6lfPmVH5wzw6XQ2t+X06+9+Kgr3IwKIMMX6wGO31j074YgbAPyjawmaDdnxseb5KKoUiQA/NN/N5U370o277imF+1emdmpE13oRAUSorD4wRnffVXe5EtTh2fLKQBfrA3OACAyDiYp2XIXxZ3cHhpOJloH/KJFZ1L4bEUCEY0RJmTfaSNRd905J4jrPERcEISPr60I4PYPW5YcJ9TUYcJSQji2Ry+uHQ+bux/709GfP++Qf8lH7bkQAEaYR25uaZNP2wkn6SHJlrLZGvRuCPhqz5AoAGPY1DHNY6OabfjIoVvQZhfZgVWULCCGQ88M/M/EXQx1+Pt6y9+koz48IIMIs1Qfuv/1Vzpn64BsYdBUzv7zKVTYbRsY30MZoELhICASAKiUFBhgMgNgUDnuQECQ9S0AqgZGsZiL+OQP/5PtB79INewdHw/3IfTcigAgzXx8o7x8o1Aganq+IX6+B1wFYWW3LKggCG4avDULN0AZF957CUT7JDyYUxiAJJQi2FBCSAGYM5bVPwD0AfkyE71avLYzQjvL8iAAinGAiGG99nbntsrO0NnXEpsGAXszAuQQsd5Sw7ZIakCb+MDAj0MW6AtFTxPwgCbqbDPVpCgdK48rG/O5o40cEEGEOkEESAmgUk/kAcudfVQ2KodOEodNJ4BQ2vIyJqomNCwIxUY4MjxCwPwQ/KUk+Gob+Y6XQfuzvaVTAFWYxj9aKCCDC3CeDC5sI+56k4zEGZQbtaG+UAHAFdpqooh8RQIT5SAgMQjsIRaNP7JvcE3AHgCsuXM7Y18toB0ehfYQIESJEiBAhQoQIESJEiBAhQoQIESJEiBAhQoQIESJEiBAhQoQIESJEiBAhQoQIESJEiBAhQoQIESJEiBAhQoQIESJEiBAhQoQIESJEiBAhQoQIESJEiBAhQoQIESJEiBAhQoQIESIcE/4/tXr+kPURXQEAAAAASUVORK5CYII=',
  logoBgColor: '#002141',
  showRing: true,
  showInfoBars: true,
  featureCards: [
    { label: '01', title: 'AIR-GAPPED' },
    { label: '02', title: 'TRIBAL KNOWLEDGE BASE' },
    { label: '03', title: 'AVAILABLE 24 / 7 / 365' },
  ],
  prompts: [
    {
      tag: 'REAL-TIME TROUBLESHOOTING',
      user: "Why does this wrinkle keep showing up on Line 4?",
      response: [
        { kind: 'p',   text: "Most likely: dwell time on the forming station has crept up. Joe's rule of thumb — keep it under 3.6s on the softer aluminum lots." },
        { kind: 'sp' },
        { kind: 'p',   text: "Walk it in this order:" },
        { kind: 'li',  text: "Check today's coil supplier — Reynolds 5052 has been running hot all week." },
        { kind: 'li',  text: "Pull dwell back to 3.4s, verify on the HMI." },
        { kind: 'li',  text: "Confirm die temp is below 240°F before re-running." },
        { kind: 'sp' },
        { kind: 'p',   text: "If the wrinkle persists, the lower clamp ring has worn pads — last replaced 4,200 cycles ago." },
      ],
    },
    {
      tag: 'ON-DEMAND WORK INSTRUCTION',
      user: "How do I run a changeover on Line 2 — Sienna to Highlander?",
      response: [
        { kind: 'p',  text: "Target window is 22 minutes. Three stages:" },
        { kind: 'sp' },
        { kind: 'h',  text: "1 · SHUT DOWN  (3 min)" },
        { kind: 'li', text: "Park both robots in maintenance pose." },
        { kind: 'li', text: "Drain coolant manifold A — valve is behind the blue panel." },
        { kind: 'h',  text: "2 · TOOLING SWAP  (12 min)" },
        { kind: 'li', text: "Bolt out fixture plates 1–4 (torque-down sequence reversed)." },
        { kind: 'li', text: "Load Highlander cassette — rack 3, slot B." },
        { kind: 'h',  text: "3 · FIRST PIECE  (7 min)" },
        { kind: 'li', text: "Run 3 test parts past the QC gate. Flag if cycle > 47s." },
      ],
    },
    {
      tag: 'ROOT-CAUSE FROM LOG HISTORY',
      user: "What were the last 3 times fault E-204 hit, and what fixed it?",
      response: [
        { kind: 'p',   text: "Fault E-204 — spindle torque over-limit. Recent occurrences pulled from the local cell log:" },
        { kind: 'sp' },
        { kind: 'log', date: 'MAY 12', detail: 'Tool 7 reground past spec',      fix: 'Replaced insert · cleared in 14 min' },
        { kind: 'log', date: 'APR 28', detail: 'Chip evac line clogged',          fix: 'Blew out manifold · cleared in 22 min' },
        { kind: 'log', date: 'APR 14', detail: 'Coolant concentration 4.1%',      fix: 'Topped to 7% · cleared in 6 min' },
        { kind: 'sp' },
        { kind: 'p',   text: "Pattern: 2 of 3 trace to coolant or chip-evac. Suggest checking coolant concentration first — 30-second test." },
      ],
    },
  ],
  docs: [
    {
      style: 'notes',
      label: 'KNOWLEDGE-BASE ENTRY · TRIBAL',
      title: "Line 4 — Wrinkle Defect Notes",
      sub: "J. VASQUEZ · LEAD OP, 2ND SHIFT · UPDATED MAY 04",
      sections: [
        { heading: "Rules of thumb", items: [
          "- Keep dwell at or below 3.6s on softer alloy lots — anything more and the wrinkle starts.",
          "- Reynolds 5052 has been running hot all week. Back off another 0.2s on those coils.",
          "- Don't re-run until the die is under 240°F. Use the IR gun, not the HMI temp.",
        ]},
        { heading: "What I've noticed", items: [
          "- The wrinkles cluster near the corner radius first. That tells you where to look.",
          "- Worst hour is 05:00–07:00. Die is cold from the overnight idle.",
        ]},
        { heading: "Lower clamp ring history", items: [
          "- Pads were last swapped at 4,200 cycles. We're due around now.",
          "- Symptom progression I keep seeing: hairline → wave → full wrinkle. Catch it at the wave.",
        ]},
      ],
    },
    {
      style: 'standardwork',
      label: 'STANDARD WORK · REV 3 · CONTROLLED',
      title: "Standard Instructions - Mold Changeover",
      sub: "SIENNA → HIGHLANDER · TAKT 22:00 · QA K. RHEA",
      sections: [
        { heading: "Prep", items: [
          "- Park both robots in maintenance pose (M-pose).",
          "- Drain coolant manifold A — blue panel valve, turn ¼ clockwise.",
          "- Disengage clamp pressure: HMI → Safety → Release Hold.",
        ]},
        { heading: "Fixture Swap", items: [
          "- Bolt out fixture plates 1–4 — reverse torque sequence (plate 4 first).",
          "- Lift Sienna cassette via overhead crane, set in Rack 1.",
          "[Load Highlander cassette — Rack 3, Slot B.]",
        ]},
        { heading: "Restart & Verify", items: [
          "- Re-engage clamp pressure and re-prime coolant manifold.",
          "- Run 3 first-piece test parts past the QC gate. Flag if cycle > 47s.",
        ]},
      ],
    },
    {
      style: 'recovery',
      label: 'RECOVERY PROCEDURE · QA REV 7',
      title: "Incident Log - CNC Machine",
      sub: "TIER 1 ESCALATION · 14-MIN MEAN RESOLUTION",
      sections: [
        { heading: "Fault E-204", items: [
          "- Triggered when spindle torque exceeds 142% of nominal for >300ms.",
          "- Auto-pause engages. Carriage retracts to home. Part damage is uncommon.",
        ]},
        { heading: "Initial diagnostics (1 min)", items: [
          "- Confirm the fault on HMI · note timestamp and program block.",
          "- Visual check: chips piling, coolant pooling, tool jam.",
        ]},
        { heading: "Tier 1 — Tooling", items: [
          "- Inspect Tool 7 wear flat. Replace insert if > 0.3mm.",
          "- Verify tool offset against last calibrated value.",
        ]},
        { heading: "Tier 1 — Chip evacuation", items: [
          "- Inspect chip evac line for clog (manifold B).",
          "- Blow out at 90 psi. Re-run a half-cycle dry to confirm flow.",
        ]},
        { heading: "Tier 1 — Coolant concentration", highlight: true, items: [
          "- Pull a 50ml sample from the Line A return port.",
          "- Test on the refractometer — target band is 6.0–8.0%.",
          "[If below 5.0%: top up with concentrate to 7.0%, agitate 60 seconds.]",
          "- Re-test before resuming production. Log result in the cell journal.",
        ]},
        { heading: "Tier 2 — Mechanical", items: [
          "- Check spindle bearing temperature (sensor SP-3T).",
          "- Inspect drawbar tension — service if below 18 kN.",
        ]},
        { heading: "Escalation", items: [
          "[If 3 tier-1 attempts fail: page maintenance lead and open a work order.]",
        ]},
      ],
    },
  ],
};

function loadConfig() {
  try {
    const saved = localStorage.getItem(CONFIG_KEY);
    if (saved) return { ...CONFIG_DEFAULTS, ...JSON.parse(saved) };
  } catch {}
  return { ...CONFIG_DEFAULTS };
}
function saveConfig(cfg)  { try { localStorage.setItem(CONFIG_KEY, JSON.stringify(cfg)); } catch {} }
function clearConfig()    { try { localStorage.removeItem(CONFIG_KEY); } catch {} }

// ─── Palette ──────────────────────────────────────────────────────────────────
const C_BG    = '#002141';
const C_PAPER = '#EFEDE8';
const C_DIM   = '#D6E0E9';
const C_MUTED = '#737984';
const C_AMBER = '#E6870B';
const C_MONO  = "'JetBrains Mono', ui-monospace, monospace";
const C_SANS  = "'Inter', system-ui, sans-serif";

// ─── Tiny helpers ─────────────────────────────────────────────────────────────
function arrayMove(arr, from, to) {
  if (to < 0 || to >= arr.length) return arr;
  const r = [...arr];
  const [item] = r.splice(from, 1);
  r.splice(to, 0, item);
  return r;
}

function newBlock(kind) {
  if (kind === 'sp')  return { kind };
  if (kind === 'log') return { kind, date: 'DATE', detail: 'Description', fix: 'Resolution' };
  return { kind, text: '' };
}

// ─── Export standalone HTML ───────────────────────────────────────────────────
async function exportStandalone(cfg) {
  let status = 'Fetching source files…';
  try {
    const [animSrc, docsSrc, cfgSrc, sceneSrc] = await Promise.all([
      fetch('animations.jsx').then(r => r.text()),
      fetch('docs.jsx').then(r => r.text()),
      fetch('config.jsx').then(r => r.text()),
      fetch('scene.jsx').then(r => r.text()),
    ]);

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<title>Approachable AI · Local LLM on a Laptop</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
<style>
  html,body,#root{height:100%;margin:0;background:#002141;}
  body{font-family:'Inter',system-ui,sans-serif;color:#EFEDE8;}
  *{box-sizing:border-box;}
</style>
</head>
<body>
<div id="root"></div>
<script>
  window.__BAKED_CONFIG = ${JSON.stringify(cfg)};
  window.__SKIP_CONFIG_SCREEN = true;
<\/script>
<script src="https://unpkg.com/react@18.3.1/umd/react.production.min.js" crossorigin="anonymous"><\/script>
<script src="https://unpkg.com/react-dom@18.3.1/umd/react-dom.production.min.js" crossorigin="anonymous"><\/script>
<script src="https://unpkg.com/@babel/standalone@7.29.0/babel.min.js" crossorigin="anonymous"><\/script>
<script type="text/babel">
${cfgSrc}
<\/script>
<script type="text/babel">
${animSrc}
<\/script>
<script type="text/babel">
${docsSrc}
<\/script>
<script type="text/babel">
${sceneSrc}
<\/script>
</body>
</html>`;

    const blob = new Blob([html], { type: 'text/html' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href     = url;
    a.download = 'Approachable AI - Presentation.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    return 'Downloaded!';
  } catch (err) {
    return 'Export failed: ' + err.message;
  }
}

// ─── Form primitives ──────────────────────────────────────────────────────────
function CField({ label, value, onChange, textarea = false, mono = false }) {
  return (
    <div style={{ marginBottom: 8 }}>
      {label && (
        <div style={{ fontFamily: C_MONO, fontSize: 9.5, letterSpacing: '0.12em',
          color: C_AMBER, marginBottom: 3, textTransform: 'uppercase' }}>
          {label}
        </div>
      )}
      {textarea
        ? <textarea value={value} rows={2} onChange={e => onChange(e.target.value)}
            style={{ width: '100%', padding: '7px 10px', background: C_DIM, color: C_BG,
              border: 'none', borderRadius: 5, fontFamily: mono ? C_MONO : C_SANS,
              fontSize: mono ? 11 : 13, resize: 'vertical', outline: 'none', boxSizing: 'border-box' }} />
        : <input type="text" value={value} onChange={e => onChange(e.target.value)}
            style={{ width: '100%', padding: '7px 10px', background: C_DIM, color: C_BG,
              border: 'none', borderRadius: 5, fontFamily: mono ? C_MONO : C_SANS,
              fontSize: mono ? 11 : 13, outline: 'none', boxSizing: 'border-box' }} />
      }
    </div>
  );
}

function CSec({ label }) {
  return (
    <div style={{ fontFamily: C_MONO, fontSize: 10.5, letterSpacing: '0.2em', color: C_AMBER,
      marginTop: 28, marginBottom: 12, borderBottom: '1px solid rgba(230,135,11,0.25)', paddingBottom: 6 }}>
      {label}
    </div>
  );
}

function CSub({ label }) {
  return (
    <div style={{ fontFamily: C_MONO, fontSize: 9.5, letterSpacing: '0.14em', color: C_MUTED,
      marginTop: 14, marginBottom: 8 }}>
      ▸ {label}
    </div>
  );
}

const btnBase = {
  border: 'none', borderRadius: 4, cursor: 'pointer',
  fontFamily: C_MONO, fontSize: 10, letterSpacing: '0.08em',
  padding: '4px 8px',
};

// ─── Markdown ↔ blocks converters ────────────────────────────────────────────
function blocksToText(blocks) {
  return (blocks || []).map(b => {
    if (b.kind === 'sp')  return '';
    if (b.kind === 'h')   return `## ${b.text}`;
    if (b.kind === 'li')  return `- ${b.text}`;
    if (b.kind === 'lst') return `[${b.text}]`;
    if (b.kind === 'log') return `[LOG ${b.date} | ${b.detail} | ${b.fix}]`;
    return b.text; // 'p'
  }).join('\n');
}

function textToBlocks(text) {
  const blocks = [];
  for (const raw of text.split('\n')) {
    const line = raw.trimEnd();
    if (line.trim() === '') {
      if (blocks.length > 0 && blocks[blocks.length - 1].kind !== 'sp')
        blocks.push({ kind: 'sp' });
    } else if (line.startsWith('## ')) {
      blocks.push({ kind: 'h', text: line.slice(3).trim() });
    } else if (/^[-*] /.test(line)) {
      blocks.push({ kind: 'li', text: line.slice(2).trim() });
    } else if (/^\[LOG /i.test(line) && line.endsWith(']')) {
      const parts = line.slice(5, -1).split('|').map(s => s.trim());
      blocks.push({ kind: 'log', date: parts[0] || '', detail: parts[1] || '', fix: parts[2] || '' });
    } else if (line.startsWith('[') && line.endsWith(']')) {
      blocks.push({ kind: 'lst', text: line.slice(1, -1).trim() });
    } else {
      blocks.push({ kind: 'p', text: line });
    }
  }
  while (blocks.length && blocks[blocks.length - 1].kind === 'sp') blocks.pop();
  return blocks;
}

function docToBlocks(doc) {
  if (!doc) return [];
  const blocks = [];
  for (const sec of (doc.sections || [])) {
    if (blocks.length > 0) blocks.push({ kind: 'sp' });
    blocks.push({ kind: 'h', text: sec.heading });
    for (const item of sec.items) {
      if (item.startsWith('[') && item.endsWith(']'))
        blocks.push({ kind: 'lst', text: item.slice(1, -1) });
      else if (item.startsWith('- '))
        blocks.push({ kind: 'li', text: item.slice(2) });
      else
        blocks.push({ kind: 'p', text: item });
    }
  }
  return blocks;
}

function blocksToDoc(blocks, origDoc) {
  const sections = [];
  let cur = null;
  for (const b of blocks) {
    if (b.kind === 'sp') continue;
    if (b.kind === 'h') { cur = { heading: b.text, items: [] }; sections.push(cur); }
    else if (b.kind === 'li' || b.kind === 'p' || b.kind === 'lst') {
      if (!cur) { cur = { heading: '', items: [] }; sections.push(cur); }
      cur.items.push(b.kind === 'lst' ? `[${b.text}]` : b.kind === 'li' ? `- ${b.text}` : b.text);
    }
  }
  return { ...origDoc, sections };
}

// ─── Markdown response editor ─────────────────────────────────────────────────
function MarkdownEditor({ blocks, onChange, hint }) {
  const [text, setText] = React.useState(() => blocksToText(blocks));

  const handle = (val) => { setText(val); onChange(textToBlocks(val)); };

  return (
    <div>
      <textarea
        value={text}
        rows={10}
        spellCheck={false}
        onChange={e => handle(e.target.value)}
        style={{ width: '100%', padding: '10px 12px', background: C_DIM, color: C_BG,
          border: 'none', borderRadius: 5, fontFamily: C_MONO, fontSize: 12,
          resize: 'vertical', outline: 'none', lineHeight: 1.65, boxSizing: 'border-box' }}
      />
      <div style={{ fontFamily: C_MONO, fontSize: 9, color: C_MUTED,
        letterSpacing: '0.08em', marginTop: 4 }}>
        {hint || '## Heading  ·  - Bullet  ·  [List item]  ·  blank line = spacer'}
      </div>
    </div>
  );
}

// ─── Block editor (for AI response) ──────────────────────────────────────────
function BlockEditor({ blocks, onChange }) {
  const move   = (i, dir) => onChange(arrayMove(blocks, i, i + dir));
  const remove = (i)      => onChange(blocks.filter((_, j) => j !== i));
  const add    = (kind)   => onChange([...blocks, newBlock(kind)]);
  const update = (i, patch) => onChange(blocks.map((b, j) => j !== i ? b : { ...b, ...patch }));

  const kindLabel = { p: 'Paragraph', h: 'Heading', li: 'Bullet', log: 'Log entry', sp: 'Spacer' };

  return (
    <div>
      {blocks.map((block, i) => (
        <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 6, alignItems: 'flex-start' }}>
          {/* Block type badge */}
          <div style={{ fontFamily: C_MONO, fontSize: 9, color: C_AMBER, background: 'rgba(230,135,11,0.12)',
            borderRadius: 3, padding: '3px 6px', whiteSpace: 'nowrap', marginTop: 2, flexShrink: 0 }}>
            {kindLabel[block.kind] || block.kind}
          </div>

          {/* Fields */}
          <div style={{ flex: 1 }}>
            {block.kind === 'sp' && (
              <div style={{ fontFamily: C_MONO, fontSize: 10, color: C_MUTED, padding: '6px 0' }}>— spacer —</div>
            )}
            {block.kind === 'log' && (
              <div style={{ display: 'grid', gridTemplateColumns: '90px 1fr 1fr', gap: 6 }}>
                <CField value={block.date}   onChange={v => update(i, { date: v })}   mono />
                <CField value={block.detail} onChange={v => update(i, { detail: v })} />
                <CField value={block.fix}    onChange={v => update(i, { fix: v })}    />
              </div>
            )}
            {(block.kind === 'p' || block.kind === 'h' || block.kind === 'li') && (
              <CField value={block.text} onChange={v => update(i, { text: v })}
                textarea={block.kind === 'p'} />
            )}
          </div>

          {/* Controls */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2, flexShrink: 0 }}>
            <button onClick={() => move(i, -1)} style={{ ...btnBase, background: 'rgba(239,237,232,0.08)', color: C_MUTED }}>↑</button>
            <button onClick={() => move(i,  1)} style={{ ...btnBase, background: 'rgba(239,237,232,0.08)', color: C_MUTED }}>↓</button>
            <button onClick={() => remove(i)}   style={{ ...btnBase, background: 'rgba(230,135,11,0.12)',  color: C_AMBER }}>✕</button>
          </div>
        </div>
      ))}

      {/* Add block buttons */}
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 8 }}>
        {['p', 'h', 'li', 'log', 'sp'].map(kind => (
          <button key={kind} onClick={() => add(kind)}
            style={{ ...btnBase, background: 'rgba(239,237,232,0.08)', color: C_DIM,
              border: '1px solid rgba(214,224,233,0.2)', padding: '5px 10px' }}>
            + {kindLabel[kind]}
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Preview components — full 1920×1080 frames scaled to fit ─────────────────
// Each preview renders at actual animation coordinates then scales to ~720px wide.

const PREV_SC = 0.375; // 1920 × 0.375 = 720px

function PrevWrap({ label, children }) {
  return (
    <div style={{ marginBottom: 6, borderRadius: 8, overflow: 'hidden',
      border: '1px solid rgba(230,135,11,0.22)' }}>
      <div style={{ fontFamily: C_MONO, fontSize: 9, letterSpacing: '0.18em', color: C_AMBER,
        background: 'rgba(230,135,11,0.08)', padding: '5px 12px',
        borderBottom: '1px solid rgba(230,135,11,0.15)' }}>
        PREVIEW · {label}
      </div>
      {children}
    </div>
  );
}

function FramePreview({ label, children }) {
  return (
    <PrevWrap label={label}>
      <div style={{ position: 'relative', width: 1920 * PREV_SC, height: 1080 * PREV_SC,
        overflow: 'hidden', maxWidth: '100%' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, width: 1920, height: 1080,
          transformOrigin: 'top left', transform: `scale(${PREV_SC})`, pointerEvents: 'none' }}>
          {children}
        </div>
      </div>
    </PrevWrap>
  );
}

// Shared scene-frame building blocks
function PrevBG() {
  return <div style={{ position: 'absolute', inset: 0,
    background: 'radial-gradient(ellipse 80% 60% at 50% 60%, rgba(54,94,149,0.35) 0%, #002141 70%)' }} />;
}
function PrevTopBar() {
  return (
    <div style={{ position: 'absolute', left: 60, right: 60, top: 38,
      display: 'flex', alignItems: 'baseline', gap: 16, fontFamily: C_MONO, color: '#EFEDE8', fontSize: 12 }}>
      <div style={{ letterSpacing: '0.18em', color: C_AMBER }}>APPROACHABLE AI</div>
      <div style={{ letterSpacing: '0.14em', opacity: 0.5 }}>· AI FACTORY ADVISOR · RUNNING LOCALLY</div>
      <div style={{ flex: 1 }} />
      <div style={{ fontSize: 11, letterSpacing: '0.16em', opacity: 0.5 }}>FTE FACTORY ADVISORS</div>
    </div>
  );
}
function PrevBottomBar({ phase }) {
  const labels = ['INTRO', 'PROMPT 1', 'PROMPT 2', 'PROMPT 3', 'OUTRO'];
  return (
    <div style={{ position: 'absolute', left: 60, right: 60, bottom: 36,
      display: 'flex', gap: 14, alignItems: 'center',
      color: '#EFEDE8', fontFamily: C_MONO, fontSize: 11, letterSpacing: '0.14em' }}>
      {labels.map((lbl, i) => {
        const active = i === phase, done = i < phase;
        return (
          <React.Fragment key={i}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8,
              opacity: active ? 1 : done ? 0.55 : 0.25 }}>
              <div style={{ width: 8, height: 8, borderRadius: 4,
                background: active ? C_AMBER : done ? '#EFEDE8' : 'transparent',
                border: `1px solid ${active || done ? 'transparent' : 'rgba(239,237,232,0.35)'}` }} />
              <span style={{ fontWeight: active ? 600 : 400 }}>{lbl}</span>
            </div>
            {i < labels.length - 1 &&
              <div style={{ flex: 1, height: 1, background: 'rgba(239,237,232,0.14)', maxWidth: 60 }} />}
          </React.Fragment>
        );
      })}
      <div style={{ flex: 1 }} />
      <div style={{ opacity: 0.45 }}>0 BYTES EGRESS · SINCE BOOT</div>
    </div>
  );
}
function PrevScrollHint() {
  return (
    <div style={{ position: 'absolute', bottom: 88, left: '50%', transform: 'translateX(-50%)',
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 7 }}>
      <div style={{ fontFamily: C_MONO, fontSize: 13, letterSpacing: '0.2em', color: '#737984' }}>
        SCROLL TO CONTINUE
      </div>
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M11 3v16M3 11l8 8 8-8" stroke="#E6870B" strokeWidth="1.6"
          strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}
// Laptop shell at the exact scene coordinates (410, 180), screenW=1100, screenH=640, bezel=22
function PrevLaptop({ scale = 1, tx = 0, children }) {
  const lw = 1144, lh = 684; // 1100+22*2, 640+22*2
  return (
    <div style={{ position: 'absolute', left: 410, top: 180, width: lw, height: lh + 36,
      transform: `translate(${tx}px, 0) scale(${scale})`, transformOrigin: '50% 50%' }}>
      <div style={{ position: 'absolute', left: 0, top: 0, width: lw, height: lh,
        background: '#1c2030', borderRadius: 14, overflow: 'hidden' }}>
        <div style={{ position: 'absolute', left: 22, top: 22, width: 1100, height: 640,
          background: '#EFEDE8', overflow: 'hidden' }}>
          {children}
        </div>
      </div>
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 36,
        background: '#141820', borderRadius: '0 0 12px 12px' }}>
        <div style={{ position: 'absolute', left: '50%', top: '50%',
          transform: 'translate(-50%,-50%)', width: 120, height: 16,
          background: '#0d1118', borderRadius: 3 }} />
      </div>
    </div>
  );
}

// ── Screen content components (render inside the 1100×640 laptop screen) ────

function PrevBootContent({ subtitle, logoSrc, logoBgColor }) {
  const src = logoSrc;
  const bg  = logoBgColor || '#002141';
  return (
    <div style={{ position: 'absolute', inset: 0, background: '#EFEDE8',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      gap: 22, fontFamily: C_SANS }}>
      <div style={{ width: 120, height: 120, background: bg, borderRadius: 20,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 0 20px rgba(230,135,11,0.45)' }}>
        <img src={src} alt="Logo"
          style={{ width: 88, height: 88, objectFit: 'contain' }} />
      </div>
      <div style={{ fontFamily: C_MONO, fontSize: 60, fontWeight: 600,
        color: '#002141', letterSpacing: '0.06em' }}>APPROACHABLE AI</div>
      <div style={{ fontFamily: C_MONO, fontSize: 30, letterSpacing: '0.2em',
        color: '#737984', textAlign: 'center' }}>{subtitle}</div>
      <div style={{ width: 380, height: 4, background: '#D6E0E9' }}>
        <div style={{ width: '100%', height: '100%', background: C_AMBER }} />
      </div>
    </div>
  );
}

function BlocksStatic({ blocks }) {
  return (
    <div style={{ fontFamily: C_SANS, fontSize: 18, color: '#002141', lineHeight: 1.6 }}>
      {(blocks || []).map((b, i) => {
        if (b.kind === 'sp') return <div key={i} style={{ height: 10 }} />;
        if (b.kind === 'h') return (
          <div key={i} style={{ fontFamily: C_MONO, fontSize: 13, letterSpacing: '0.12em',
            color: C_AMBER, fontWeight: 600, margin: '10px 0 4px' }}>{b.text}</div>
        );
        if (b.kind === 'li') return (
          <div key={i} style={{ display: 'flex', gap: 12, padding: '2px 0', alignItems: 'flex-start' }}>
            <div style={{ width: 5, height: 5, borderRadius: 3, background: '#002141',
              marginTop: 9, flexShrink: 0 }} />
            <div>{b.text}</div>
          </div>
        );
        if (b.kind === 'lst') return (
          <div key={i} style={{ display: 'flex', alignItems: 'flex-start',
            padding: '5px 12px', margin: '2px 0',
            background: 'rgba(230,135,11,0.07)',
            borderLeft: '2px solid rgba(230,135,11,0.45)',
            borderRadius: '0 4px 4px 0', fontSize: 17, lineHeight: 1.5 }}>
            {b.text}
          </div>
        );
        if (b.kind === 'log') return (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: '72px 1fr',
            gap: '4px 14px', padding: '8px 0', fontSize: 17,
            borderTop: i > 0 && blocks[i - 1].kind === 'log' ? '1px dashed #D6E0E9' : 'none' }}>
            <div style={{ fontFamily: C_MONO, fontSize: 13, color: C_AMBER, fontWeight: 600 }}>{b.date}</div>
            <div style={{ fontWeight: 500 }}>{b.detail}</div>
            <div />
            <div style={{ color: '#737984', fontSize: 15.5 }}>→ {b.fix}</div>
          </div>
        );
        return <div key={i} style={{ padding: '1px 0' }}>{b.text}</div>;
      })}
    </div>
  );
}

function PrevChatContent({ prompt, doc }) {
  return (
    <div style={{ position: 'absolute', inset: 0, background: '#EFEDE8',
      display: 'flex', flexDirection: 'column' }}>
      {/* screen header */}
      <div style={{ height: 50, background: '#D6E0E9', borderBottom: '1px solid #D6E0E9',
        display: 'flex', alignItems: 'center', padding: '0 20px', gap: 16,
        fontFamily: C_MONO, fontSize: 13, color: '#737984', letterSpacing: '0.08em', flexShrink: 0 }}>
        <div style={{ display: 'flex', gap: 6 }}>
          {['#E6870B', '#8C9CA4', '#365E95'].map((c, i) =>
            <div key={i} style={{ width: 12, height: 12, borderRadius: 6, background: c }} />)}
        </div>
        <div style={{ fontFamily: C_SANS, fontSize: 16, fontWeight: 600, color: '#002141' }}>
          Approachable AI
        </div>
        <div>FACTORY-FLOOR ADVISOR</div>
        <div style={{ flex: 1 }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
          <div style={{ width: 9, height: 9, borderRadius: 5, background: '#365E95' }} />
          LOCAL · ON-DEVICE · 0 EGRESS
        </div>
      </div>
      {/* tag strip */}
      <div style={{ padding: '12px 22px 10px', fontFamily: C_MONO, fontSize: 12,
        letterSpacing: '0.14em', color: '#737984',
        display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
          <div style={{ width: 18, height: 1, background: C_AMBER }} />{prompt.tag}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: C_AMBER, fontWeight: 600 }}>
          <div style={{ width: 6, height: 6, borderRadius: 3, background: C_AMBER }} />DOC RETRIEVED
        </div>
      </div>
      {/* split: chat left, doc right */}
      <div style={{ flex: 1, display: 'flex', minHeight: 0, gap: 14, padding: '0 20px 0 22px' }}>
        <div style={{ flex: 1, minWidth: 0, overflow: 'hidden', padding: '8px 4px 14px',
          display: 'flex', flexDirection: 'column', gap: 14, fontFamily: C_SANS }}>
          <div style={{ alignSelf: 'flex-end', maxWidth: '82%', padding: '14px 20px',
            background: '#002141', color: '#EFEDE8', borderRadius: '14px 14px 4px 14px',
            fontSize: 20, fontWeight: 500, lineHeight: 1.45 }}>{prompt.user}</div>
          <div style={{ alignSelf: 'flex-start', maxWidth: '94%', padding: '18px 22px',
            background: '#D6E0E9', borderRadius: '4px 14px 14px 14px',
            fontSize: 18, color: '#002141', lineHeight: 1.6 }}>
            <BlocksStatic blocks={prompt.response} />
          </div>
        </div>
        {doc && (
          <div style={{ width: 580, flexShrink: 0, paddingTop: 8, paddingBottom: 14, overflow: 'hidden' }}>
            <div style={{ width: '100%', height: '100%', background: 'white', borderRadius: 8,
              padding: '18px 20px', boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
              overflow: 'hidden', color: '#002141', fontFamily: C_SANS }}>
              <div style={{ fontFamily: C_MONO, fontSize: 9, letterSpacing: '0.18em',
                color: '#737984', marginBottom: 4 }}>{doc.label}</div>
              <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 2 }}>{doc.title}</div>
              <div style={{ fontFamily: C_MONO, fontSize: 11, color: '#737984', marginBottom: 14 }}>{doc.sub}</div>
              {(doc.sections || []).map((sec, si) => (
                <div key={si} style={{ marginBottom: 10 }}>
                  <div style={{ fontFamily: C_MONO, fontSize: 9.5, letterSpacing: '0.1em',
                    color: C_AMBER, fontWeight: 600, marginBottom: 4 }}>{sec.heading.toUpperCase()}</div>
                  {sec.items.map((item, ii) => {
                    const isLst = item.startsWith('[') && item.endsWith(']');
                    const isBullet = !isLst && item.startsWith('- ');
                    const text = isLst ? item.slice(1, -1) : isBullet ? item.slice(2) : item;
                    return isLst ? (
                      <div key={ii} style={{ padding: '3px 8px', margin: '1px 0',
                        background: 'rgba(230,135,11,0.07)',
                        borderLeft: '2px solid rgba(230,135,11,0.45)',
                        borderRadius: '0 3px 3px 0', fontSize: 13 }}>{text}</div>
                    ) : isBullet ? (
                      <div key={ii} style={{ display: 'flex', gap: 8, padding: '2px 0',
                        fontSize: 13, alignItems: 'flex-start' }}>
                        <div style={{ width: 3, height: 3, borderRadius: 2, background: '#002141',
                          marginTop: 6, flexShrink: 0 }} />
                        <div>{text}</div>
                      </div>
                    ) : (
                      <div key={ii} style={{ fontSize: 13, padding: '2px 0', lineHeight: 1.5 }}>{text}</div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      {/* input bar */}
      <div style={{ borderTop: '1px solid #D6E0E9', padding: '16px 20px',
        background: '#D6E0E9', display: 'flex', alignItems: 'center', gap: 14, flexShrink: 0 }}>
        <div style={{ flex: 1, height: 48, background: '#EFEDE8', border: '1px solid #D6E0E9',
          borderRadius: 10, display: 'flex', alignItems: 'center', padding: '0 18px',
          fontFamily: C_SANS, fontSize: 18, color: '#737984' }}>Ask anything about the line…</div>
        <div style={{ width: 48, height: 48, borderRadius: 10, background: C_AMBER,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: C_MONO, fontSize: 17, fontWeight: 700, color: '#002141' }}>↵</div>
      </div>
    </div>
  );
}

function PrevOutroContent({ cfg }) {
  const d = CONFIG_DEFAULTS;
  const tag = cfg.outroTag || '', line1 = cfg.outroLine1 || d.outroLine1, line2 = cfg.outroLine2 || '';
  const split = (text) => {
    if (!text) return null;
    if (text.includes('||')) { const [a, b] = text.split('||'); return <><span style={{ color: C_AMBER }}>{a}</span><span style={{ color: '#002141' }}>{b}</span></>; }
    const m = text.match(/^(.*?\bTO\b\s*)(.*)/s);
    if (m && m[2]) return <><span style={{ color: C_AMBER }}>{m[1]}</span><span style={{ color: '#002141' }}>{m[2]}</span></>;
    return <span style={{ color: C_AMBER }}>{text}</span>;
  };
  return (
    <div style={{ position: 'absolute', inset: 0, background: '#EFEDE8',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      gap: 14, padding: 40, textAlign: 'center', fontFamily: C_SANS }}>
      {tag && <div style={{ fontFamily: C_MONO, fontSize: 13, letterSpacing: '0.22em', color: C_AMBER }}>{tag}</div>}
      <div style={{ fontSize: 60, fontWeight: 600, letterSpacing: '-0.02em', lineHeight: 1.15, maxWidth: 1100, color: '#002141' }}>
        {split(line1)}{line2 && <><br />{split(line2)}</>}
      </div>
      <div style={{ display: 'flex', gap: 32, marginTop: 16, fontFamily: C_MONO,
        color: '#737984', letterSpacing: '0.12em', fontSize: 24 }}>
        <span>NO CLOUD</span>
        <span style={{ width: 1, background: '#D6E0E9', display: 'inline-block' }} />
        <span>NO INTERNET</span>
        <span style={{ width: 1, background: '#D6E0E9', display: 'inline-block' }} />
        <span>RUNS LOCALLY</span>
      </div>
    </div>
  );
}

// ── Assembled scene previews ──────────────────────────────────────────────────

function OpeningScenePrev({ cfg }) {
  const d = CONFIG_DEFAULTS;
  const cards = cfg.featureCards || d.featureCards;
  return (
    <FramePreview label="OPENING SCENE">
      <PrevBG />
      <PrevTopBar />
      {/* Feature intro — left side, fully visible at t=5.5 */}
      <div style={{ position: 'absolute', left: 90, top: 200, width: 760,
        color: '#EFEDE8', fontFamily: C_SANS }}>
        <div style={{ fontFamily: C_MONO, fontSize: 14, letterSpacing: '0.22em',
          color: C_AMBER, marginBottom: 18 }}>{cfg.splashCaption || d.splashCaption}</div>
        <div style={{ fontSize: 54, fontWeight: 600, letterSpacing: '-0.022em',
          lineHeight: 1.05, marginBottom: 48 }}>
          {cfg.splashHeadlineLine1 || d.splashHeadlineLine1}<br />
          {cfg.splashHeadlineLine2 || d.splashHeadlineLine2}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
          {cards.map((card, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '80px 1fr', gap: 22 }}>
              <div style={{ fontFamily: C_MONO, fontSize: 26, fontWeight: 600, color: C_AMBER }}>
                {card.label}
              </div>
              <div style={{ fontSize: 32, fontWeight: 600, letterSpacing: '-0.01em',
                lineHeight: 1.15, alignSelf: 'center' }}>{card.title}</div>
            </div>
          ))}
        </div>
      </div>
      {/* Laptop — scale 0.55, tx 358 (exact values at t=5.5 in the animation) */}
      <PrevLaptop scale={0.55} tx={358}>
        <PrevBootContent subtitle={cfg.bootSubtitle || d.bootSubtitle} logoSrc={cfg.logoSrc} logoBgColor={cfg.logoBgColor} />
      </PrevLaptop>
      <PrevScrollHint />
      <PrevBottomBar phase={0} />
    </FramePreview>
  );
}

function BootPrev({ cfg }) {
  return (
    <FramePreview label="BOOT SCREEN — laptop at full size">
      <PrevBG />
      <PrevTopBar />
      <PrevLaptop scale={1} tx={0}>
        <PrevBootContent subtitle={cfg.bootSubtitle || CONFIG_DEFAULTS.bootSubtitle} />
      </PrevLaptop>
      <PrevBottomBar phase={0} />
    </FramePreview>
  );
}

function OutroPrev({ cfg }) {
  return (
    <FramePreview label="OUTRO SCREEN">
      <PrevBG />
      <PrevTopBar />
      <PrevLaptop scale={1} tx={0}>
        <PrevOutroContent cfg={cfg} />
      </PrevLaptop>
      <PrevBottomBar phase={4} />
    </FramePreview>
  );
}

function ChatPrev({ prompt, doc, sceneIdx }) {
  return (
    <FramePreview label={`SCENE ${sceneIdx + 1} — PAUSED WITH FULL CONTENT`}>
      <PrevBG />
      <PrevTopBar />
      <PrevLaptop scale={1} tx={0}>
        <PrevChatContent prompt={prompt} doc={doc} />
      </PrevLaptop>
      <PrevScrollHint />
      <PrevBottomBar phase={sceneIdx + 1} />
    </FramePreview>
  );
}

function DocPrev({ doc, prompt, sceneIdx }) {
  return (
    <FramePreview label={`SCENE ${sceneIdx + 1} — DOCUMENT PANEL`}>
      <PrevBG />
      <PrevTopBar />
      <PrevLaptop scale={1} tx={0}>
        <PrevChatContent prompt={prompt} doc={doc} />
      </PrevLaptop>
      <PrevScrollHint />
      <PrevBottomBar phase={sceneIdx + 1} />
    </FramePreview>
  );
}

// ─── ConfigScreen ─────────────────────────────────────────────────────────────
function ConfigScreen({ onLaunch }) {
  const [cfg, setCfg]       = React.useState(() => loadConfig());
  const [exporting, setExp] = React.useState(false);
  const [exportMsg, setMsg] = React.useState('');
  const [importKey, setImportKey] = React.useState(0);

  const set = (key, val) => setCfg(c => ({ ...c, [key]: val }));

  const setCard = (i, field, val) => setCfg(c => ({
    ...c, featureCards: c.featureCards.map((card, idx) => idx === i ? { ...card, [field]: val } : card),
  }));

  const setPrompt = (pi, field, val) => setCfg(c => ({
    ...c, prompts: c.prompts.map((p, i) => i !== pi ? p : { ...p, [field]: val }),
  }));

  const setResponse = (pi, blocks) => setCfg(c => ({
    ...c, prompts: c.prompts.map((p, i) => i !== pi ? p : { ...p, response: blocks }),
  }));

  const setDocField = (di, field, val) => setCfg(c => ({
    ...c, docs: c.docs.map((d, i) => i !== di ? d : { ...d, [field]: val }),
  }));

  const setDocBody = (di, newDoc) => setCfg(c => ({
    ...c, docs: c.docs.map((d, i) => i !== di ? d : newDoc),
  }));

  const addCard    = () => setCfg(c => ({ ...c, featureCards: [...c.featureCards, { label: String(c.featureCards.length + 1).padStart(2, '0'), title: '' }] }));
  const removeCard = (i) => setCfg(c => ({ ...c, featureCards: c.featureCards.filter((_, idx) => idx !== i) }));

  const handleLaunch = () => { saveConfig(cfg); onLaunch(cfg); };
  const handleReset  = () => { clearConfig(); setCfg({ ...CONFIG_DEFAULTS }); setImportKey(k => k + 1); };

  const handleDownloadConfig = () => {
    const blob = new Blob([JSON.stringify(cfg, null, 2)], { type: 'application/json' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href     = url;
    a.download = 'approachable-ai-config.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleUploadConfig = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const parsed = JSON.parse(ev.target.result);
        // Migrate any standardwork doc that still uses the old steps[] format
        if (parsed.docs) {
          parsed.docs = parsed.docs.map(doc => {
            if (doc.style === 'standardwork' && doc.steps && !doc.sections) {
              return {
                ...doc,
                sections: [{ heading: 'Steps', items: doc.steps.map(s => `- ${s.text}`) }],
                steps: undefined,
              };
            }
            return doc;
          });
        }
        setCfg({ ...CONFIG_DEFAULTS, ...parsed });
        setImportKey(k => k + 1);
      } catch {
        setMsg('Upload failed: invalid config file.');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleExport = async () => {
    setExp(true);
    setMsg('Fetching source files…');
    const result = await exportStandalone(cfg);
    setMsg(result);
    setExp(false);
  };

  return (
    <div style={{ position: 'fixed', inset: 0, background: C_BG, color: C_PAPER,
      fontFamily: C_SANS, overflowY: 'auto', zIndex: 9999 }}>
      <div style={{ maxWidth: 780, margin: '0 auto', padding: '36px 28px 120px' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 28 }}>
          <div>
            <div style={{ fontFamily: C_MONO, fontSize: 10, letterSpacing: '0.22em', color: C_AMBER, marginBottom: 6 }}>
              APPROACHABLE AI
            </div>
            <div style={{ fontSize: 26, fontWeight: 600, letterSpacing: '-0.02em' }}>
              Presentation Setup
            </div>
          </div>
          <button onClick={handleReset} style={{ marginTop: 4, padding: '6px 14px', background: 'transparent',
            border: `1px solid ${C_MUTED}`, borderRadius: 5, color: C_MUTED,
            fontFamily: C_MONO, fontSize: 10, letterSpacing: '0.1em', cursor: 'pointer' }}>
            RESET DEFAULTS
          </button>
        </div>

        {/* ── Opening scene ── */}
        <OpeningScenePrev cfg={cfg} />
        <CSec label="SPLASH SCREEN" />
        <CField label="Caption"        value={cfg.splashCaption}       onChange={v => set('splashCaption', v)} />
        <CField label="Headline line 1" value={cfg.splashHeadlineLine1} onChange={v => set('splashHeadlineLine1', v)} />
        <CField label="Headline line 2" value={cfg.splashHeadlineLine2} onChange={v => set('splashHeadlineLine2', v)} />

        {/* ── Feature cards (preview shared with splash above) ── */}
        <CSec label="FEATURE CARDS" />
        {cfg.featureCards.map((card, i) => (
          <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-end', marginBottom: 8 }}>
            <div style={{ width: 80, flexShrink: 0 }}>
              <CField label="Label" value={card.label} onChange={v => setCard(i, 'label', v)} />
            </div>
            <div style={{ flex: 1 }}>
              <CField label="Title" value={card.title} onChange={v => setCard(i, 'title', v)} />
            </div>
            <button onClick={() => removeCard(i)}
              style={{ ...btnBase, background: 'rgba(230,135,11,0.12)', color: C_AMBER,
                padding: '7px 10px', marginBottom: 8, flexShrink: 0 }}>✕</button>
          </div>
        ))}
        <button onClick={addCard}
          style={{ ...btnBase, background: 'rgba(239,237,232,0.08)', color: C_DIM,
            border: `1px solid rgba(214,224,233,0.2)`, padding: '6px 14px', marginTop: 2 }}>
          + Add card
        </button>

        {/* ── Boot ── */}
        <BootPrev cfg={cfg} />
        <CSec label="BOOT SCREEN" />
        <CField label="Subtitle" value={cfg.bootSubtitle} onChange={v => set('bootSubtitle', v)} />

        {/* Logo upload + background color */}
        <div style={{ display: 'flex', gap: 12, alignItems: 'flex-end', marginBottom: 16 }}>
          {/* Logo preview tile */}
          <div style={{ width: 64, height: 64, borderRadius: 10, flexShrink: 0,
            background: cfg.logoBgColor || '#002141',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: '1px solid rgba(214,224,233,0.2)' }}>
            <img src={cfg.logoSrc} alt="Logo"
              style={{ width: 46, height: 46, objectFit: 'contain' }} />
          </div>

          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
            {/* PNG upload */}
            <div>
              <div style={{ fontFamily: C_MONO, fontSize: 9, letterSpacing: '0.18em',
                color: C_MUTED, marginBottom: 5 }}>LOGO IMAGE (PNG)</div>
              <label style={{ display: 'inline-block', cursor: 'pointer',
                padding: '6px 14px', background: 'rgba(239,237,232,0.08)', color: C_DIM,
                border: `1px solid rgba(214,224,233,0.2)`, borderRadius: 5,
                fontFamily: C_MONO, fontSize: 10, letterSpacing: '0.1em' }}>
                {cfg.logoSrc ? 'CHANGE IMAGE' : 'UPLOAD PNG'}
                <input type="file" accept="image/png,image/*" style={{ display: 'none' }}
                  onChange={e => {
                    const file = e.target.files[0];
                    if (!file) return;
                    const reader = new FileReader();
                    reader.onload = ev => set('logoSrc', ev.target.result);
                    reader.readAsDataURL(file);
                  }} />
              </label>
              {cfg.logoSrc && (
                <button onClick={() => set('logoSrc', '')}
                  style={{ marginLeft: 8, ...btnBase, background: 'rgba(230,135,11,0.12)',
                    color: C_AMBER, padding: '6px 10px' }}>✕ RESET</button>
              )}
            </div>

            {/* Background color */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ fontFamily: C_MONO, fontSize: 9, letterSpacing: '0.18em',
                color: C_MUTED }}>TILE COLOR</div>
              <input type="color" value={cfg.logoBgColor || '#002141'}
                onChange={e => set('logoBgColor', e.target.value)}
                style={{ width: 32, height: 24, padding: 0, border: 'none',
                  borderRadius: 4, cursor: 'pointer', background: 'none' }} />
              <span style={{ fontFamily: C_MONO, fontSize: 10, color: C_DIM }}>
                {cfg.logoBgColor || '#002141'}
              </span>
            </div>
          </div>
        </div>

        {/* ── Outro ── */}
        <OutroPrev cfg={cfg} />
        <CSec label="OUTRO SCREEN" />
        <CField label="Tagline (optional)"        value={cfg.outroTag}  onChange={v => set('outroTag', v)} />
        <CField label="Headline line 1"            value={cfg.outroLine1} onChange={v => set('outroLine1', v)} />
        <CField label="Headline line 2 (optional)" value={cfg.outroLine2} onChange={v => set('outroLine2', v)} />

        {/* ── Scenes (chat + document together) ── */}
        {cfg.prompts.map((prompt, i) => {
          const doc = cfg.docs[i];
          return (
            <div key={i}>
              <ChatPrev prompt={prompt} doc={doc} sceneIdx={i} />
              <CSec label={`SCENE ${i + 1}`} />
              <CField label="Scene tag"     value={prompt.tag}  onChange={v => setPrompt(i, 'tag', v)} />
              <CField label="User question" value={prompt.user} onChange={v => setPrompt(i, 'user', v)} textarea />
              <CSub label="AI RESPONSE" />
              <MarkdownEditor
                key={`response-${i}-${importKey}`}
                blocks={prompt.response}
                onChange={blocks => setResponse(i, blocks)}
              />
              <CSub label="DOCUMENT" />
              <CField label="Title"               value={doc.title} onChange={v => setDocField(i, 'title', v)} />
              <CField label="Subtitle / metadata" value={doc.sub}   onChange={v => setDocField(i, 'sub', v)} mono />
              <MarkdownEditor
                key={`doc-${i}-${importKey}`}
                blocks={docToBlocks(doc)}
                onChange={blocks => setDocBody(i, blocksToDoc(blocks, doc))}
              />
            </div>
          );
        })}

        {/* ── Actions ── */}
        <div style={{ marginTop: 52, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
          <button onClick={handleLaunch} style={{
            padding: '15px 56px', background: C_AMBER, color: C_BG,
            border: 'none', borderRadius: 8, fontFamily: C_MONO,
            fontSize: 13, fontWeight: 700, letterSpacing: '0.12em', cursor: 'pointer',
          }}>
            LAUNCH PRESENTATION
          </button>

          <button onClick={handleExport} disabled={exporting} style={{
            padding: '10px 32px',
            background: 'transparent',
            color: exporting ? C_MUTED : C_DIM,
            border: `1px solid ${exporting ? C_MUTED : 'rgba(214,224,233,0.35)'}`,
            borderRadius: 8, fontFamily: C_MONO,
            fontSize: 11, letterSpacing: '0.1em', cursor: exporting ? 'default' : 'pointer',
          }}>
            {exporting ? 'EXPORTING…' : '↓ EXPORT STANDALONE HTML'}
          </button>

          {/* Config file import / export */}
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <button onClick={handleDownloadConfig} style={{
              padding: '10px 24px', background: 'transparent', color: C_DIM,
              border: '1px solid rgba(214,224,233,0.35)', borderRadius: 8,
              fontFamily: C_MONO, fontSize: 11, letterSpacing: '0.1em', cursor: 'pointer',
            }}>
              ↓ DOWNLOAD CONFIG
            </button>
            <label style={{
              padding: '10px 24px', background: 'transparent', color: C_DIM,
              border: '1px solid rgba(214,224,233,0.35)', borderRadius: 8,
              fontFamily: C_MONO, fontSize: 11, letterSpacing: '0.1em', cursor: 'pointer',
            }}>
              ↑ UPLOAD CONFIG
              <input type="file" accept=".json,application/json" style={{ display: 'none' }}
                onChange={handleUploadConfig} />
            </label>
          </div>

          {exportMsg && (
            <div style={{ fontFamily: C_MONO, fontSize: 11, color: C_MUTED, letterSpacing: '0.06em' }}>
              {exportMsg}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { CONFIG_DEFAULTS, loadConfig, saveConfig, clearConfig, ConfigScreen });
