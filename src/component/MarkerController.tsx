import React, { useState, useEffect } from "react";
import market_data from "./../market_data.json";

type Props = {
    map: any;
};
const MarkerController = ({ map }: Props) => {
    const [markers, setMarkers] = useState<any>();
    const set_all_marker = () => {
        var cur_markers: Array<any> = [];
        // @ts-ignore
        const marker_list: Array<any> = market_data;
        console.log(marker_list.length);

        marker_list.forEach((item) => {
            if (typeof item.position.latitude === null) return;
            var coordinates: { latitude: number; longitude: number } = {
                latitude: item.position.latitude,
                longitude: item.position.longitude,
            };
            var position = new window.naver.maps.LatLng(coordinates.latitude, coordinates.longitude);
            var markerOptions = {
                position: position,
                // map: map,
                icon: {
                    content: [
                        '<div class="article_marker">',
                        '<div class="marker_container">',
                        `<div class="marker_title">${item.market_name}</div>`,
                        // `<div class="marker_step">${element.step}</div>`,
                        "</div>",
                        "</div>",
                    ].join(""),
                    size: new window.naver.maps.Size(38, 58),
                    anchor: new window.naver.maps.Point(19, 58),
                },
            };
            var marker = new window.naver.maps.Marker(markerOptions);
            window.naver.maps.Event.addListener(marker, "click", function (e: any) {
                console.log(item);
                // sendPostMessageToApp({ type: "CLICK_MARKER", data: element });
            });
            cur_markers.push(marker);
        });
        setMarkers(cur_markers);
    };

    const location_rerender = () => {
        var mapBounds = map.getBounds();
        var position;
        markers.forEach((cur_marker: any) => {
            position = cur_marker.getPosition();
            if (mapBounds.hasLatLng(position)) {
                if (cur_marker.map === null) {
                    cur_marker.setMap(map);
                }
            } else {
                if (cur_marker.map !== null) {
                    cur_marker.setMap(null);
                }
            }
        });
    };

    useEffect(() => {
        set_all_marker();
    }, []);

    useEffect(() => {
        if (markers) {
            var event = window.naver.maps.Event.addListener(map, "idle", function (e: any) {
                var cur_zoom: number = map.zoom;
                console.log("ZOOM", map.zoom);
                // if (cur_zoom >= 14) {
                //     location_rerender();
                // }
                location_rerender();
            });
        }
        return () => {
            window.naver.maps.Event.removeListener(event);
            // window.naver.maps.Event.removeListener(click_event);
        };
    }, [markers]);

    return <div></div>;
};

export default MarkerController;
