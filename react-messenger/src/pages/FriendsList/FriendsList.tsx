import React, { useEffect, useMemo } from "react";
import { useFriends } from "../../store/friendsStore";
import type { User } from "@/types";

import FriendsHeader from "./components/FriendsHeader";
import MeCard from "./components/MeCard";
import FriendsRow from "./components/FriendsRow";

export default function FriendsList() {
  const init = useFriends((s) => s.init);
  const friends = useFriends((s) => s.friends) ?? [];
  const query = useFriends((s) => s.query) ?? "";
  const collapsed = useFriends((s) => s.collapsed) ?? {};
  const categoryOrder = useFriends((s) => s.categoryOrder) ?? [];

  useEffect(() => {
    init?.();
  }, [init]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return friends;
    return friends.filter((f) => {
      const name = (f.name ?? "").toLowerCase();
      const status = (f.status ?? "").toLowerCase();
      return name.includes(q) || status.includes(q);
    });
  }, [friends, query]);

  const updated = useMemo(
    () => filtered.filter((f) => f.isUpdated),
    [filtered]
  );

  const birthday = useMemo(
    () => filtered.filter((f) => f.isBirthday === true),
    [filtered]
  );

  const normals = useMemo(
    () => filtered.filter((f) => !f.isUpdated),
    [filtered]
  );

  // 그룹핑
  const groupMap = useMemo(() => {
    const map = new Map<string, User[]>();
    normals.forEach((f) => {
      const groups = f.groups && f.groups.length ? f.groups : ["기타"];
      groups.forEach((g) => {
        if (!map.has(g)) map.set(g, []);
        map.get(g)!.push(f);
      });
    });
    return map;
  }, [normals]);

  // 그룹 키 정렬 고정순서
  const dynamicKeys = Array.from(groupMap.keys());
  const orderedKeys = useMemo(
    () => [
      ...categoryOrder.filter((k) => dynamicKeys.includes(k)),
      ...dynamicKeys
        .filter((k) => !categoryOrder.includes(k))
        .sort((a, b) => a.localeCompare(b)),
    ],
    [categoryOrder, dynamicKeys]
  );

  return (
    <div className="select-none bg-white !px-4">
      {/* 내 프로필 */}
      <div className="pb-2 !mb-3">
        <div className="flex items-center justify-between px-4">
          <MeCard />
          <img src="/images/multi.svg" alt="multiProfile" />
        </div>
      </div>

      {/* <hr className="!mx-2 !my-2 h-px bg-gray-400 origin-top scale-y-10" /> */}
      <div className="w-[343px] h-px bg-gray-400 transform scale-y-50 !my-2" />
      {/* 업데이트한 프로필 */}
      <div className="pt-1">
        <FriendsHeader
          title="업데이트한 프로필"
          count={updated.length}
          collapsibleKey="updated"
        />
        {!collapsed["updated"] &&
          (updated.length === 0 ? (
            <p className="px-4 pb-2 text-[13px] text-gray-400">
              업데이트한 프로필이 없어요
            </p>
          ) : (
            updated.map((f) => <FriendsRow key={f.id} f={f} />)
          ))}
      </div>

      <div className="w-[343px] h-px bg-gray-400 transform scale-y-50 !my-2" />
      {/* 생일인 친구 */}
      <div className="pt-1">
        <FriendsHeader
          title="생일인 친구"
          count={birthday.length}
          collapsibleKey="birthday"
        />
        {!collapsed["birthday"] &&
          (birthday.length === 0 ? (
            <p className="px-4 pb-2 text-[13px] text-gray-400">
              생일인 친구가 없어요
            </p>
          ) : (
            birthday.map((f) => <FriendsRow key={f.id} f={f} />)
          ))}
        <button
          type="button"
          onClick={() => {
            // TODO: router -> 선물하기 페이지
          }}
          className="!px-1 !py-1 
      active:scale-[0.99] transition
    "
        >
          <img
            src="/images/profile/profileGift.svg"
            alt="gift"
            className="block w-full h-auto pointer-events-none select-none"
            draggable={false}
          />
        </button>
      </div>

      {/* 그룹 섹션 */}
      {orderedKeys.map((key) => {
        const list = groupMap.get(key) ?? [];
        const isCollapsed = !!collapsed[key];

        return (
          <>
            <section className="pt-10" key={`group-${key}`}>
              <FriendsHeader
                title={key}
                count={list.length}
                collapsibleKey={key}
              />

              {!isCollapsed &&
                list.map((f) => <FriendsRow key={`${key}-${f.id}`} f={f} />)}
            </section>
            <div className="w-[343px] h-px bg-gray-400 transform scale-y-50 !my-2" />
          </>
        );
      })}
    </div>
  );
}
