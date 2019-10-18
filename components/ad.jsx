export default props => (
    <div className='ad-container' style={{display: "block", width: props.width, height:props.height, float: props.float}}>
    <div className='ad'>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
        <ins
          className="adsbygoogle"
          style={{ display: "block", width: props.width, height:props.height }}
          data-ad-client="ca-pub-1246737870300549"
          data-ad-slot="5669809671"
        ></ins>
        <script>(adsbygoogle = window.adsbygoogle || []).push({'{'}{'}'});</script>
    </div>
    </div>
)