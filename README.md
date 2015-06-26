# trans

[![NPM](https://nodei.co/npm/trans.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/trans/)

Command line tool for translate English and Russion

# Usage

From arguments:
```bash
$ trans Any long string
Любую длинную строку
```

From pipe:
```bash
$ echo "My name is Sergey" | trans
Меня зовут Сергей

```

And
```bash
$ trans < ~/myfile.ru.txt
This file is contents...
```

Last:
```bash
$ trans Me | cat
Мне
```

Also you can use:
```bash
$ yatr Переведи меня, пожалуйста
Translate me, please
```