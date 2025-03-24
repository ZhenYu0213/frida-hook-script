function awaitForCondition(callback) {
    var i = setInterval(function () {
      var addr = Module.findBaseAddress('libil2cpp.so');
        console.log("Address found:", addr);
        if (addr) {
            clearInterval(i);
            callback(+addr);
        }
    }, 0);
}
var il2cpp = null;

Java.perform(function () {
    awaitForCondition(function (base) {
        il2cpp = ptr(base);
        disableCollide()
    })
})
function disableCollide(){
    Interceptor.replace(il2cpp.add(0x39B6308), new NativeCallback(function () {
        console.log("Function disabled!");
    }, 'void', []));
}
