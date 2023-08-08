//@prepros-prepend plugin.js

$(function () {
	initSlider();
	bindAddressAutoComplete();
	bindSmoothScrollOnClick();
});

$(window).on("load", function () {
	loadAnchor();
});

function initSlider() {
	$("#mainvisual.slider01 ul").slick({
		autoplay: true,
		autoplaySpeed: 3000,
		speed: 1000,
		dots: true,
		arrows: true,
	});
}

function bindAddressAutoComplete() {
	$("#postalCode").keyup(function () {
		AjaxZip3.zip2addr(this, "", "your-streetaddress", "your-streetaddress");
	});
}

function bindSmoothScrollOnClick() {
	$('a[href^="#"]').click(function (e) {
		e.preventDefault();
		performSmoothScroll($(this), 400);
	});
}

function performSmoothScroll(obj, time) {
	const href = obj.attr("href");
	const target = $(href == "#" || href == "" ? "html" : href);
	if (target.length > 0) {
		const position = calculatePosition(target);
		$("body,html").stop().animate({
			scrollTop: position
		}, time, "swing");
		return false;
	}
}

function calculatePosition(target) {
	let position = target.offset().top - 10;
	position -= $("#header").outerHeight();
	return position;
}

function loadAnchor() {
	const hash = location.hash;
	const target = $(hash == "#" || hash == "" ? "html" : hash);
	if (target.length > 0) {
		$(window).scrollTop(0);
		const position = calculatePosition(target);
		$("body,html").stop().animate({
			scrollTop: position
		}, 1, "swing");
	}
}

// 以下、three.jsのコード

// id="myCanvas" がある場合に起動
if ($('#myCanvas').length) {
	window.addEventListener("DOMContentLoaded", init);

	// init()関数の中にThree.jsを使用するためのコードを追記します。
	function init() {
		const width = 960;
		const height = 540;

		// レンダラーを作成
		const renderer = new THREE.WebGLRenderer({
			canvas: document.querySelector('#myCanvas')
		});
		renderer.setSize(width, height);
		renderer.setPixelRatio(window.devicePixelRatio);

		// シーンを作成
		const scene = new THREE.Scene();

		// カメラを作成
		const camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
		// カメラの初期座標を設定（X座標:0, Y座標:0, Z座標:0）
		camera.position.set(0, 0, 1000);

		// 箱を作成
		const geometry = new THREE.BoxGeometry(500, 500, 500);
		const material = new THREE.MeshStandardMaterial({
			color: 0x0000FF
		});
		const box = new THREE.Mesh(geometry, material);
		scene.add(box);

		// 平行光源
		const light = new THREE.DirectionalLight(0xFFFFFF);
		light.intensity = 2; // 光の強さを倍に
		light.position.set(1, 1, 1); // ライトの方向
		// シーンに追加
		scene.add(light);

		// 初回実行
		tick();

		function tick() {
			requestAnimationFrame(tick);

			// 箱を回転させる
			box.rotation.x += 0.01;
			box.rotation.y += 0.01;

			// レンダリング
			renderer.render(scene, camera);
		}
	}
}

// id="myCanvas01" がある場合に起動
// ここから自由に書いてみる
if ($('#myCanvas01').length) {
	window.addEventListener("DOMContentLoaded", init);

	// init()関数の中にThree.jsを使用するためのコードを追記します。
	function init() {

		// 1. レンダラーを作る
		const renderer = new THREE.WebGLRenderer({
			canvas: document.querySelector('#myCanvas01'),
			alpha: true, // +@ レンダラーの背景に透明色を有効にする。
			// レンダラーの背景色を透明にした後は、CSSでグラデにするとか。なんでもOK
			// https://pisuke-code.com/three-js-scene-background-gradient/
		});

		// setSizeメソッドでサイズを設定する。
		// あとでフルスクリーン化するので値はなんでもいい
		const width = 1;
		const height = 1;
		renderer.setSize(width, height);

		// スマホでも綺麗に見えるよう、デバイスピクセル比も設定。
		renderer.setPixelRatio(window.devicePixelRatio);

		// 2. シーンを作る
		const scene = new THREE.Scene();

		// 3. カメラを作る
		const camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
		// カメラの初期座標を設定（X座標:0, Y座標:0, Z座標:0）
		camera.position.set(0, 0, 1000);

		// 4. 〇〇を作る（例では立方体だったけど、ここでは自由に作ってみる）
		// 三角錐を作ってみる
		const geometry = new THREE.TetrahedronGeometry(90, 0); // 三角錐
		const material = new THREE.MeshStandardMaterial({
			color: 0x41a9a5
		});
		const box = new THREE.Mesh(geometry, material);
		scene.add(box);

		// 5. ライトを作る
		const light = new THREE.AmbientLight(0xFFFFFF, 25.0);
		// シーンに追加
		scene.add(light);

		// +@ フォグを設定
		// https://ics.media/tutorial-three/fog/
		// new THREE.Fog(色, 開始距離, 終点距離);
		scene.fog = new THREE.Fog(0x000000, 50, 2000);

		// +@ レンダラーの背景色を設定
		// renderer.setClearColor(0xFFFFFF, 1);

		// 6+7: 描画する + アニメーション
		// +@ マウスの動きに連動してカメラを動かしてみる
		let rot = 0; // 角度
		let rotY = 0; // 角度（Y）
		let mouseX = 0; // マウス座標
		let mouseY = 0; // マウス座標（Y）

		// マウス座標はマウスが動いた時のみ取得できる
		document.addEventListener("mousemove", (event) => {
			mouseX = event.pageX;
			mouseY = event.pageY;
		});

		tick();

		// 毎フレーム時に実行されるループイベントです
		function tick() {

			box.rotation.x += 0.01;
			box.rotation.y += 0.01;

			// マウスの位置に応じて角度を設定
			// マウスのX座標がステージの幅の何%の位置にあるか調べてそれを360度で乗算する
			const targetRot = (mouseX / window.innerWidth) * 360;
			const targetRotY = (mouseY / window.innerHeight) * 360;

			// イージングの公式を用いて滑らかにする
			// 値 += (目標値 - 現在の値) * 減速値
			rot += (targetRot - rot) * 0.02;
			rotY += (targetRotY - rotY) * 0.02;

			// ラジアンに変換する
			const radian = rot * Math.PI / 180;
			const radianY = rotY * Math.PI / 180;
			// 角度に応じてカメラの位置を設定
			camera.position.x = 1000 * Math.sin(radian);
			camera.position.y = 1000 * Math.sin(radianY);
			camera.position.z = 1000 * Math.cos(radian);

			// 原点方向を見つめる
			camera.lookAt(new THREE.Vector3(0, 0, 0));

			// レンダリング
			renderer.render(scene, camera);

			requestAnimationFrame(tick);
		}

		
		// +@ フルスクリーン化してみる
		// https://ics.media/tutorial-three/renderer_resize/
		// 初期化のために実行
		onResize();
		// リサイズイベント発生時に実行
		window.addEventListener('resize', onResize);

		function onResize() {
			// サイズを取得
			const width = window.innerWidth;
			const height = window.innerHeight;

			// レンダラーのサイズを調整する
			renderer.setPixelRatio(window.devicePixelRatio);
			renderer.setSize(width, height);

			// カメラのアスペクト比を正す
			camera.aspect = width / height;
			camera.updateProjectionMatrix();
		}

	}
}
