# 每天操作的字符串
## 实例属性
```
String.prototype.length
// 返回数组的长度
```
# 数组的实例方法

## String.prototype.charAt();
方法返回指定位置的字符，参数是从0开始编号的位置

## String.prototype.concat()
concat方法用于连接两个字符串，返回一个新字符串，不改变原字符串。

##  String.prototype.slice()
slice方法用于从原字符串取出子字符串并返回，不改变原字符串。它的第一个参数是子字符串的开始位置，第二个参数是子字符串的结束位置（不含该位置）。

## String.prototype.substring()
substring方法用于从原字符串取出子字符串并返回，不改变原字符串，跟slice方法很相像。它的第一个参数表示子字符串的开始位置，第二个位置表示结束位置（返回结果不含该位置）。

## String.prototype.substr()
substr方法用于从原字符串取出子字符串并返回，不改变原字符串，跟slice和substring方法的作用相同。
substr方法的第一个参数是子字符串的开始位置（从0开始计算），第二个参数是子字符串的长度。如果省略第二个参数，则表示子字符串一直到原字符串的结束。

## String.prototype.indexOf()
indexOf方法用于确定一个字符串在另一个字符串中第一次出现的位置，返回结果是匹配开始的位置。如果返回-1，就表示不匹配。

## String.prototype.trim()
trim方法用于去除字符串两端的空格，返回一个新字符串，不改变原字符串。

## String.prototype.toLowerCase()，String.prototype.toUpperCase()
toLowerCase方法用于将一个字符串全部转为小写，toUpperCase则是全部转为大写。它们都返回一个新字符串，不改变原字符串。

## String.prototype.match()
match方法用于确定原字符串是否匹配某个子字符串，返回一个数组，成员为匹配的第一个字符串。如果没有找到匹配，则返回null。

## String.prototype.search()，String.prototype.replace()
search方法的用法基本等同于match，但是返回值为匹配的第一个位置。如果没有找到匹配，则返回-1。
replace方法用于替换匹配的子字符串，一般情况下只替换第一个匹配（除非使用带有g修饰符的正则表达式）。

## String.prototype.split()
split方法按照给定规则分割字符串，返回一个由分割出来的子字符串组成的数组。

* * *
# es6中新增的字符串方法

## includes(), startsWith(), endsWith()
includes(): 返回布尔值，表示是否找到了参数字符串
startsWith(): 返回布尔值，表示参数字符串是否在原字符串的头部
endsWith(): 返回布尔值，表示参数字符串是否在原字符串的尾部
```
let s = 'Hello world!';

s.startsWith('world', 6) // true
s.endsWith('Hello', 5) // true
s.includes('Hello', 6) // false
```