<BlogMetaDecorator folder="chap2CaiNhinDauTienVeHook" image="allHeadphones.jpg" imageAlt="HookFirtLook" description="Hook mới được thêm ở phiên bản React 16.8 và tương thích với các phiên bản trước nên không có gì phải lo lắng." title="Chap 2. Cái nhìn đầu tiên về Hooks  " />

![hook](https://www.vtnetzwelt.com/wp-content/uploads/2019/08/react-hooks.jpg)

## Hook mới được thêm ở phiên bản React 16.8 và tương thích với các phiên bản trước nên không có gì phải lo lắng.

## 1. State Hook:

<Code language="javascript">
import React from "react";
import "font-awesome/css/font-awesome.min.css";
const FaviconComponent = () => {
  return &lt;p className="fa fa-twitter" />;
};
export default FaviconComponent;</Code>

<Code language="css">
  h1 {
  background-color: green;
  }
  div {
  background-color: lightblue;
  }
  p {
  background-color: yellow;
}</Code>

```css
h1 {
  background-color: green;
}

div {
  background-color: lightblue;
}

p {
  background-color: yellow;
}
```

<!-- <Code language="css">
h1 {
background-color: green;
}
div {
background-color: lightblue;
}
p {
background-color: yellow;
}</Code> -->

<!-- <Code language="bash">useState</Code> là hook cho phép khai báo một state như <Code language="bash">this.state={}</Code> vậy. -->

Ví dụ trên thì chúng ta khai báo một state count và khi chúng ta muốn thay đổi giá trị của state count đó thì dùng biến setState (nó có chức năng giống hàm this.setState trong Class ). Đằng sau là useState(0) , 0 là giá trị ban đầu của biến count hay chính là initialState.
Nó kiểu hiểu nôm na rằng hãy tạo cho tao 1 state có tên count có giá trị ban đầu là 0 và cho tao một biến setCount dùng để thay đổi giá trị của state count .

Mọi người có thể thêm nhiều hook trong function:

## 2. Effect Hook:

Mọi người thường nghe nói tới sideEffect : đó là những việc lấy dữ liệu , đăng ký hoặc thay đổi DOM và nó không thể xong trong quá trình render , còn có thể gây ảnh hưởng tới các component khác.
Anh em còn nhớ bộ ba quyền lực componentDidMount, componentDidUpdate, và componentWillUnmount trong React classes, thứ làm điên đảo mọi dev khi mới đụng vào react thì useEffect là một hook 3 trong 1 gồm chức năng của cả 3 hàm trên, nghe quá cool ngầu đúng o ? ^^

Dùng lại ví dụ đếm ở trên :

<!-- <Code language="javascript">
    function Example() {
    const [count, setCount] = useState(0);

    // Giống componentDidMount và componentDidUpdate:
    useEffect(() => {
    // Cập nhật tiêu đề trang web sử dụng API trình duyệt
    document.title = `Bạn đã bấm ${count} lần`;
    });

    return (

    <div>
    <p>Bạn đã bấm {count} lần</p>
    <button onClick={() => setCount(count + 1)}>
    Bấm vào tôi
    </button>
    </div>
    );
    }

</Code> -->

React chạy effect sau lần render đầu tiên , điều này làm useEffect là nơi fetch data từ api lý tưởng, phần này mình sẽ viết trong chap khác.
Tóm lại là useEffect rất mạnh , nó có 3 chế độ chạy và kèm theo 1 cách để clear hàm nữa. Trong 1 component có thể có nhiều useEffect.

## 3. ✌️ Quy tắc của Hooks :

1. Chỉ gọi hook ở trên cùng. Không được gọi trong vòn lập ,điều kiện , hoặc các hàm lồng nhau.
2. Không gọi hook trong Class component , class nó chơi với tụi lifecycle không chơi với hooks.
3. Mọi người có thể xài linter plugin check của chính React team để check lỗi hooks , có thể lần đầu chưa quen nhưng nó sẽ giúp ích rất lớn sau này khi làm web của bạn đúng logic mong muốn . Lỗi không đáng sợ , đáng sợ là có lỗi mà mò mãi không biết nó lỗi ở đâu . ^^

## 4. Custom hooks : Tư xây dựng hook của mình

Đây là một điều khiến hooks trở nên mạnh mẽ , chúng ta có thể tự tạo hook theo nhu cầu của mình , theo bất cứ thứ gì chúng ta muốn , tái sử dụng nó ở bất cứ nơi đâu.

```

```
