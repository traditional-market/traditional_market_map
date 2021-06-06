import React, { useState, useEffect } from "react";
import MarkerController from "./component/MarkerController";
import ZoomController from "./component/ZoomController";
type Props = {};
declare global {
    interface Window {
        naver: any;
        N: any;
        ReactNativeWebView: any;
        start_coords: { latitude: number; longitude: number };
        latitude: string;
        longtitude: string;
    }
}

const App = () => {
    const [map, setMap] = useState<any>();

    const navermaps = window.naver.maps;
    const load = (url: string, cb: () => void) => {
        var element: any = document.createElement("script");
        var parent = "body";
        var attr = "src";

        element.async = true;
        element.onload = function () {
            cb();
        };
        element.onerror = function () {
            alert("ERROR OCCURED IN MAP");
        };
        element[attr] = url;
        // @ts-ignore
        document[parent].appendChild(element);
    };
    const initMap = () => {
        var clientId = "5bz8hdi09q";
        var url = "https://openapi.map.naver.com/openapi/v3/maps.js?clientId=" + clientId;
        load(url, function () {
            var MYNAVERMAP = new navermaps.Map("map", {
                center: new window.naver.maps.LatLng(
                    window.latitude ? parseFloat(window.latitude) : 37.3595704,
                    window.longtitude ? parseFloat(window.longtitude) : 127.105399
                ),
                zoom: 15,
            });

            setMap(MYNAVERMAP);
        });
    };

    useEffect(() => {
        initMap();
    }, []);

    return (
        <>
            {map && (
                <>
                    <MarkerController map={map} />
                    <ZoomController map={map} />
                </>
            )}
            <div id="map"></div>
        </>
    );
};

export default App;
